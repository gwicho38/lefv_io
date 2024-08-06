---
id: host-virtualization-routing-congestion
created_date: 22/11/2022
updated_date: 22/11/2022
type: note
---

#  host-virtualization-routing-congestion

- **🏷️Tags** :  

## 📝 Notes

- Virtual switches on hosts  
- SR-IOV  
- Open vSwitch  
- L2 data center routing: STP, TRILL  
- OSPF and BGP for the data center  
- ECMP  
- Scatter-gather traffic patterns and the TCP incast proble

### Networking VMs

Hypervisor --> VM

#### Docker

![Pasted image](20221123165425.png)

Docker is a container manager. Container packages are smaller and don't run guest OS processes.

### Host Virtualization Discussion

Performance Consistency: SRIOV vs.

Flexibility: OpenVirtual Switch

### Routing and Traffic Engineering

==Spanning Tree Protocol==: loop-free routing in simple networks. Uses a subset of links to route on. Subset is tree and therefore no loops.

	Note: 
		
			works well if the network looks like tree.
			 at enterprise level -- top tier would be large requiring large siwtches. 
			Now -- we build Clos networks. STP not a great fit for Clos networks. 
			If one device fails - network is partitioned. 

#### Proposed Fixes

##### TRILLS:

	allows us to use any link in network. 

	single point of failure.

##### OSP First

	link state means advantages of TRILL but not new. 

	routes on L3 -> more config needed -> not plug and play

	lack of freedom over traffic engineering -> can't do much to detrmine resulting routing structure. Cost is only way to affect network structure. 

##### BGP

	Path Vector protocol

	Global scale internet routing protocol. 

	Routers in ASi, and ASj, can offer each other information about the internal state of the network. 

	BGP allows ISPs to use policies to determine actual routes. 

	ASs ignore announcements that aren't better than known announcements. 

	Paths are stored as vectors in the routing vector itself. 

	Note: 
		eBGP is now used in intra-network routing. 

		Benefits: 
			IP layer means avoids L2 broadcast problem. 
			Designed to be interoperable. OSPF might be designed for one domain. 

		Cons: 
			L3 means that VM migration is harder. 
			Slower convergence. 

### Why All Alternatives?

Larger scale DS (supporting E:W traffic) network complexity makes internet-scale protocols more attractive.

Traffic Engineering:

	Monitoring traffic and network state is computationally expensive. 

	problem should be solved in distributed way.

	ECMP (Equal cost multi-path routing). Picks two equal paths randomly. Buffering of packets lead to race conditions and potentially a loss. 

Solution: flow level hashing. Output port f() hash of packet header.

#### Flowlet

ECMP only makes local decisions without knowledge of failure further from the path.

CONGA was developed by cisco to address this problem. Requires maintaining a table for everyy switch that picks least congested path on flowlet basis.

### Congestion Control

How is capacity shared among hosts?

Why hard?

- implemented at sender level.

How to address problem?

- E2E mechanism
- When receiver sends packet it can respond to sender providing hints regarding speed and throughput
- If all packets are aknowledged --> increase rate
- if seeing packet loss --> decrease rate
- 

### # Routing and Traffic Engineering: Packet Forwarding on Multiple Paths

	

	How to Monitor Network State using Multi park routing?

## Additional Readings and Resources

The following readings and resources are required unless indicated otherwise:

- [Only Section 2.2 is mandatory] [A Scalable, Commodity Data Center Network Architecture](http://ccr.sigcomm.org/online/files/p63-alfares.pdf "Link: http://ccr.sigcomm.org/online/files/p63-alfares.pdf")
	
- [Data Center TCP (DCTCP)](http://www.sigcomm.org/sites/default/files/ccr/papers/2010/October/1851275-1851192.pdf "Data Center TCP (DCTCP)") (Sections 3.3-3.5 are optional. Also, for the traffic data presented in this paper, keep in mind the course’s first lesson and be a bit wary of treating this set of measurements – like any other – as “representative.”)
	
- [Use of BGP for Routing in Large-Scale Data Centers](https://tools.ietf.org/html/draft-lapukhov-bgp-routing-large-dc-07)
	
- [Background] [RFC, TCP Congestion Control](https://tools.ietf.org/html/rfc5681 "Link: https://tools.ietf.org/html/rfc5681") (This is an RFC, i.e., "Request for Comments." These are documents that network engineers and scientists publish about their present thinking and proposals on important networking questions. This one is an excellent way to familiarize yourself with RFCs in general. They’re also occasionally funny, in so much as computer science jokes are funny: [TCP Option to Denote Packet Mood](https://tools.ietf.org/html/rfc5841 "Link: https://tools.ietf.org/html/rfc5841").)
	
- [OPTIONAL] [Facebook's Data Center Fabric](https://www.youtube.com/watch?v=kcI3fGEait0 "Link: https://www.youtube.com/watch?v=kcI3fGEait0")
	
- [OPTIONAL] [CONGA: Distributed Congestion-Aware Load Balancing for Datacenters](https://people.csail.mit.edu/alizadeh/papers/conga-sigcomm14.pdf) (We highly recommend reading and understanding Figure 1 in the paper, even if you don’t find time for the rest – it’s a great overview of the (currently exposed) design space for traffic engineering.)
	
- [OPTIONAL] [The Design and Implementation of Open vSwitch](https://www.usenix.org/system/files/conference/nsdi15/nsdi15-paper-pfaff.pdf "Link: https://www.usenix.org/system/files/conference/nsdi15/nsdi15-paper-pfaff.pdf")

## 🔗 Links
