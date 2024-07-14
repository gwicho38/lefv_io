# Programming Assignment 2: Unicast Routing

In this assignment, you will implement traditional shortest-path routing, with the link state (LS) or distance/path vector (DV/PV) protocols.

The test setup will be the same environment as in MP1, you can use either Docker container or a VM as the environment.

Your nodes will use different virtual network adapters, with iptables restricting communication among them. We are providing you with the same script that our testing environment uses to establish these restrictions.

==This MP introduces the unfortunate distinction between “network order” and “host order”, AKA endianness==. The logical way to interpret 32 bits as an integer is to call the left-most bit the highest, and the right-most the lowest. This is the standard that programs sending raw binary integers over the internet are expected to follow. Due to historical quirks, however, x86 processors store integers reversed at the byte level. Look up htons(), htonl(), ntohs(), ntohl() for information on how to deal with it.

[](https://d18ky98rnyall9.cloudfront.net/kma4ZINkQzWmuGSDZMM1Yw_6a732aa38085434cbb65fef29422b6f1_MP2.zip?Expires=1666224000&Signature=c3BekEvp5btxPqsxTVpJZmpUyvDBaJrUCufSyj6HvQ7nXcXUBKuV-VsNQbCaRVn1d1kQE9E87FUDS5VOwDZq57gbIS0Xcpo9JP5ZyOp1BjlHgK~qYe3nY-XGZ0a-fNw53aLHen7pn2RQz4Ss~2MMHxEdHq6cCDfWNU4BZW4Ra~A_&Key-Pair-Id=APKAJLTNE6QMUY6HBC5A)

## Network Emulation Environment

For this assignment, we emulate a network of routers. The emulation is in fact a virtual network which makes use of **iptables** in Linux. iptables is an application that allows users to configure specific rules that will be enforced by the kernel's netfilter framework. iptables instructs the kernel to filter packets (i.e., drop some and permit others to pass through) and to act as a firewall, among other uses. These per-packet decisions can be based on various packet fields like transport port, protocol number, IP address, and more.

==Your nodes will all run on the same machine or on the same container. There will be an emulated topology applied to them in the following manner:==

- ==Each node (router) is represented as a single process running on the VM.== Each has a unique identifier. Valid IDs range from 0 through and including 255.
	
- For each node, a virtual interface (eth0:1, eth0:2, etc) will be created and given an IP address.
	
- A node with ID n gets address 10.1.1.n.
	
==-   iptables rules will be applied to restrict which of these addresses can talk to which others. 10.1.1.30 and 10.1.1.0 can talk to each other if and only if they are neighbors in the emulated topology.==
	
- The topology's connectivity is defined in a file that gets read by the script that creates the environment. The link costs are defined in files that tell nodes what their initial link costs to other nodes are, **if they are in fact neighbors**.
	
==-   *A node's only way to determine who its neighbors are is to see who it can directly communicate with.* Nodes do not get to see the aforementioned connectivity file.==
	

## Manager

While running, your nodes will receive instructions and updated information from a manager program. You are not responsible for submitting an implementation of this manager; we will test using our own.

Your interaction with the manager is very simple: it sends messages in individual UDP packets to your nodes on UDP port 7777. (These are one-way messages with no reply.)

The packets you receive from the manager have one of two meanings:

“send a data packet into the network”, or
“your direct link to node X now has cost N.”

Their formats and details are as follows.

**Manager Message: “Send a data packet”:**

==**"send"**<4 ASCII bytes>==**destID**<net order 2 bytes>**message**<some ASCII message (shorter than 100 bytes)>

==For example, suppose the destination ID is 4 and message is “hello”. The manager command will be:==

“send4hello”

==where 4 occupies 2 bytes and is in the network order. You need to convert it to the host order to get the correct destID. Note that there is no space delimiter among "send", destID and the message body.==

**Manager Message: “New cost to your neighbor” (Optional):**

==**"cost"**<4 ASCII bytes>**destID**<net order 2 bytes>**newCost**<net order 4 bytes>==

Example: the manager informs node 2 that the cost to node 5 is set to 33. The command received by node 2 will be:

“cost533”

==where 5 occupies 2 bytes and 33 occupies 4 bytes. Both of them are in the network order. You need to convert them to the host order to get the correct destID and newCost. ====Note that there is no space delimiter among "cost", destID and newCost==.

Our auto-grader doesn't include a test case using the **cost** command. In other words, link costs will always be as specified in the initial link costs file (or cost 1 if the link is not mentioned).

However, we recommend handling “cost” messages in your router because:

- It will help you test your code, specifically the functionality of handling link failure and recovery.
 

==Handling a link failure==== should use the same basic functionality in your code as handling a cost change that makes the link too expensive to use (you could choose to use a special value, like -1, to signal infinte link cost)

==. Having the manager send “cost” messages to simulate bringing links up/down can be more convenient than manually running iptables commands.

The additional code needed to handle link costs should be minimal, once you can handle link state changes (failure/recovery).

	

**Note**

The source code of the manager is included in the attachment. You can read it to gain a better understanding of the format. Feel free to compile it and use it to test your nodes.

## Your Router Nodes

Whether you are writing an LS or DV/PV node, your node's interface to the assignment environment is the same.

==Your node should run with command-line arguments like this:==

![[Pasted image 20221018000730.png]]

TODO



==When originating, forwarding, or receiving a data packet, your node should log the event to its log file==.

TODO:

==The sender of a packet should also log when it learns that the packet was undeliverable. ==The format of the logging is described in the next section.

TODO:

==**Note**: even if the node has nothing to write to the log file, the log file should still be created.==
	
==The link costs that your node receives from the input file and the manager don't tell your node whether those links actually currently exist, just what they would cost if they did.==

TODO:

==Your node therefore needs to constantly monitor which other nodes it is able to send/receive UDP packets directly to/from==. In the attachment (main.c and monitor_neighbors.h), we have provided the code that you can use for this.

Now, for what they should actually accomplish:

- ==Using LS or DV/PV, maintain a correct forwarding table.==
	
- ==Forward any data packets that come along== according to the forwarding table.
	
- ==React to changes in the topology (specifically, links becoming available or failing) by realizing that the change has happened and updating routes and forwarding tables appropriately==. Your nodes should converge within 5 seconds of the most recent change.
	

There are a couple special cases that your routers must handle.

**Network partitions:** the network might become partitioned, meaning that there is some subset of nodes that is cut off from other nodes, with no operational paths. If and when this occurs, your protocols should react correctly: ==when a node is asked to originate a packet towards a destination it does not know a path for, it should drop the packet, and rather than log a "send" event, log an "unreachable" event== (see File Formats section).

==**Tie breaking**==: We would like everyone to have consistent output even on complex topologies, so we ask you to follow a specific tie-breaking rule. When selecting a shortest path to a destination, ==if there are multiple next-hops with the same path cost, choose the path whose next hop router has lowest ID.== (This is similar to tie-breaking rules used in real routers, so that the selected paths are predictable and deterministic. That's useful for network engineers in real deployments, and also useful for our autograder!) Note that this means your protocol, when it is computing paths, can't completely ignore paths of equal cost to those it has already found; it will have to check their router IDs.

## File Formats

==Your nodes take the “initial costs file” as input, and write their output to a log file.== The locations of both of these files are specified on the command line, as described earlier. The initial costs files might be read-only.

**Initial costs file format:** The initial cost file given to some node X consists of zero or more lines. Each line indicates that node X has a link in the topology to another neighboring node, and that link has a certain cost:

![[Pasted image 20221017230257.png]]

In the above example, if this file was given to node 6, then the link between nodes 5 and 6 has cost 23453245 – as long as that link is up in the physical topology.

==If you don't find an entry for a node, default to cost 1. ==We will only use positive costs – never 0 or negative. We will not try to break your program with malformed inputs. Once again, just because this file contains a line for node n, it does NOT imply that your node will be neighbors with n.

==**Log file format:** ==See our provided code later in this document for sprintf()s that generate the log file lines correctly. It is important that you use the right format, since these files will be inspected by the autograder. The log file might take the form something like this:

![[Pasted image 20221017230452.png]]

In the following specific example, the node forwarded a message bound for node 56, received a message for itself, originated packets for nodes 11 and 12 (but realized it couldn't reach 12), then forwarded another two packets.

![[Pasted image 20221017230549.png]]

Our tests will have data packets be sent relatively far apart, so don't worry about ordering.

## Extra Notes

==To set an initial topology==, run **perl make_topology.pl thetopofile** (an example topology file is provided).

Note that you need to replace all the "eth0" in the make_topology.pl file to your VM's or container's network name (e.g., enp0s3) to make the iptables work.

This will set the connectivity between nodes. To give them their initial costs, provide each with an initialcosts file (examples of these are provided as well. See the spec document for more details on all file formats). You can just give them all an empty file, if you want all links to default to cost 1.

==To make the nodes send messages, or change link costs ==while the programs are running, use manager_send.

==To bring links up and down while running==, you can use iptables to add or remove rules permitting communication between certain IP addresses. For example, to bring up the link between nodes 1 and 2:

![[Pasted image 20221017230632.png]]

… and then fwrite(logLine, 1, strlen(logLine), theLogFile);

If that's all you do to the log file, you will have the correct format.

==You should also flush the buffer to ensure the output is written to stable storage==. (Don't worry about closing the file; it will be closed when your process is killed.)

You can use the provided files as a starting point for the routing protocol implementation. However, it is fine if you want to start from scratch.

## Grading

### Test Cases

The grading will be determined by 8 tests, which are supposed to be progressively harder and stress different elements of your code.

1. Send a message to a non-neighbor node in a 3 node topology.
	
2. Send a message (by shortest path, of course) to a non-neighbor in a certain small (<20 node) topology.
	
3. Send a message to a non-neighbor node in a certain large (>50 node) topology.
	
4. Switch to a better path when one becomes available in a certain large topology.
	
5. Correctly fall back to a worse path on a certain small topology.
	
6. Correctly report a failed send in a certain small topology that gets partitioned.
	
7. Get a packet through after a former partition is healed, large topology.
	
8. Converge within the time limit after a major, rapid series of changes to the network. (The time limit starts when the final change is made.)
	

### Grading Script and Submission

Run the grading script in MP2.zip according to the instructions provided along with it and submit your results.

- Copy your compiled program in the grading script directory.
	
- Figure out the name of the network the router will run on. For the routing to work smoothly make sure your VM or container is connected to only one network. You can use the "sudo ifconfig" command to see the name of the network.
	
- Run the grading script as follows:
	

python autograde.py [program_name] [network_name]

For example, if program_name is "vec_router" and the network_name is "enp0s3", the command will be:

python autograde.py vec_router enp0s3

- If you encounter a permission error with Python subprocesses while running the autograder, add executable permissions to the grader_helper/ directory with chmod -R +x grading_helper/.
	
- After the successful execution of the grading script, a zip file named **out.zip** will be created with your program results. Unzip this with unzip -r out.zip, which should produce the results/ directory.
	
- Create a new directory called code/ for code submission. Copy your Makefile, C files, and header files into code/.
	
- Finally, zip the results and code folders with zip -r out.zip results/ code/ then submit the resulting **out.zip** on the assignment submission page on Coursera. There is no format requirement for the code files. We keep the code for plagiarism checking.
	

**NOTE**: Before running the grading script, make sure your program works correctly with the example topology provided in the programming assignment files.


10:09:48 --> [[uiuc/course/cs-435/mp2/notes]] 