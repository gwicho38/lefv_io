[MUSIC] Today, we will discuss routing. Routing solves the problem of how
to find paths between sources and destinations in the network. For example, here you have a source and
a destination, and the source wonders what path it
can use to reach the destination. So you want to install, for example, some routing information in switches
to be able to find those paths. >> 


Now, one of the things that makes this
a kind of tricky problem is that we want to do this in a distributed way. The switches and routers in the network
will be making independent decisions about where to send traffic. And when we first start up the network,
or if there's some change, we don't necessarily at any local point, we don't
have a view of the entire network. Okay, so if there are these entities
that are making individual decisions, we might make bad decisions if
we don't design a good protocol. We might make decisions where we don't get
a shortest path, don't get an efficient path, or the worst case would be we get
a path that actually results in a loop. 

Where trapped packets will
follow a infinite loop or at least a loop until
the TTL drops down to zero. So, that is one of the key
insights in a very early and important layer two routing protocol,
which is the spanning tree protocol. >> The spanning tree protocol was
designed by Radia Perlman in the 1980's to address some of these issues. So it achieves loop free
routing in simple networks. 

The core idea of
the spanning tree protocol, is to use a subset off
the network links to route on. 

The subset is a tree,
so there are no loops. So you pick a tree, and then you use
that tree to route back its own. What this means is you are giving
up some of the network's capacity. You're not using the other links. You can bring those links
up in case of failure. >> Now as we'll see this, for a modern
network, is a simplistic protocol. It's not good enough. But the advantage and the real impact of this protocol
is that it is a simple protocol. In the 1980's, it had a huge effect on
accelerating the deployment of networks, because you can just plug in devices
without any configuration, and the network works. >> Precisely, also it's still being used
in enterprise networks quite heavily. >> So, the simplification that the
expanding tree protocol makes is it takes a large network and it, kind of,
down samples it to a tree. Okay.
So this works well if your
network looks like a tree. As in perhaps a traditional data
center of ten, 15 years ago, for an enterprise where if you squint
a little bit this looks like a tree. Okay, it's not a tree,
there's some redundancy for failover or links that you might
bundle together and treat as one. But you can see the tree like structure, and spanning tree can be
made to work well here. But now if we're moving to a data center
that needs to carry much more traffic. East-West traffic between
the hosts at the leaves. Then we're putting a lot of load on
the top of the tree, the root of the tree. And this means we need very large,
physically large and expensive, switches to support that
large volume of traffic, increasingly large volume in
a very small number of switches. >> As a result, what people are doing in
design now is building topologies that scale out horizontally,
as opposed to vertically. So, you're not building the tree
such that the top tier is very big, in terms of using large and
expensive switches. What you're doing is using numerous
Smaller, cheaper switches to build, for example, close like networks,
as in this example here. Spanning tree protocol is
a pretty bad fit in these cases. Because if you think about it, if you
take just a tree subset of this network, you'll be throwing away
most of the capacity. >> So there will be many links left
unused, and we can't do multi-pathing. Which we want for
both load balance, and capacity, as well as fast fail over, as we'll see. >> Right. Also, the spanning tree is
quite a fragile protocol, so if one device fails,
your network is essentially partitioned. You have the tree, vine device fails,
the tree is partitioned. Further, spanning tree depends on
broadcasting information throughout the network. What this means is there can be scenarios
where due to misconfiguration you can have a broadcast storm. So the packet simply keep
looping throughout the network. And you have no capacity left for
actual traffic. >> So this is a increasing problem as
we build higher performance networks. And there's a alphabet
soup of proposes fixes. It's hard to tell which of
these is winning, exactly. >> If any, really. It's hard to gain an idea of
what is getting traction. Network operators are very conservative in
their choice of moving to a new protocol. Because critical operations
really depend on these networks. Further, there's lots of confusion. Propriety flavors of these standards,
for example Brocade's VCS, Cisco's FabricPath,
these are flavors of the TRILL standard. These just add to the mix and
create confusion. 

There is in fact significant debate
among operators as to which of these protocols might eventually replace
spanning tree in deployments. 

Let's look briefly at Trill's design. This is just one of
the proposed replacements, but it illustrates how one might
get around these problems. What TRILL does is run a link
state protocol between switches. So every swtch learns
the topology of the network. Now every switch knows how
to reach every other switch. And that's how you do routing. How you learn where the end
hosts are connected has still to be managed
through a separate protocol. For example, you might maintain a
directory of which hosts are connected to which switch, or perhaps you
flood that information as well. Given this setup,
let's look at what Trill achieves. All links become usable,
because you have the entire topology. And multi-path routing
also becomes possible. Let's look at an example of Trill working. So in this case,
the host sends its packet to the switch, which is in Trill's case
called an R bridge. And this switch encapsulates this packet adding information about which
switch it needs to go to. So this is the destination switch. The host itself need not be aware
of this topology information. The r wedge on the drill
switch has that information. 

Then it forwards
the switch to the next hub that'll help reach that destination
switch along the shortest path. Every successive switch does the same. And finally,
this reaches the destination switch. There the packet is decapsulated and
then delivered to the end host. >> So Trill fixes an important problem
with the spanning tree protocol, which is that it now allows us
to use any link in the network. However, there's still
a single failure domain. And it requires new hardware
to support this new protocol. And if you're running a large
Enterprise network, you're making some decisions that you probably
want to have take some conservative choices about what's going to be supported
and interoperable years into the future. >> For these reasons, one of the options
under consideration is OSPF. 

OSPF has been used for
awhile in ISP networks, for example. OSPF is Open Shortest Path First. It's also a link state protocol,
but it works at layer three. So what that means is, it routes on IP
addresses instead of MAC identifiers. The protocol itself is quite similar. It's just a link state protocol flooding
off the topology information, and then use of that topology
information independently at nodes. OSPF conveniently sidesteps many of the
difficulties that spanning tree protocol faces, as we just discussed. Being a link state protocol,
it has all of the advantages of Trill, but none of the newness. So it uses traditional routing. This is well established,
it's been used for a while, operators are comfortable with it. The disadvantage, however,
is that it routes on layer there, which means that you need
a lot more configuration. You have to assign fxample IP addresses, and sub-nets, and manage all of this instead of it
being a plug and play protocol. Like with the spanning tree. >> And we do, however, get better scalability, because you can
get that aggregation at layer three. Still however, with some scalability
problems as you grow larger and larger. You're still flooding information
about the whole topology everywhere. 

So that brings us to a more
hierarchical version of OSPF. >> That's right. Another disadvantage of OSPF is the lack of freedom in
terms of traffic engineering. Even though you have
these multiple paths and you can use simple protocols like ECMP,
to use those paths. There's very little you can do to
manipulate which routes are being used between which sources and destinations. So you can only, for example,
meddle with link costs. So if you're using the link-state protocol
the link-state protocol essentially calculates the least cost path and
costs are based on edge costs, right? 

For example, this might be a notion
of distance in the network. If far everyone has a higher cost range. So, you can meddle with the link
cost in manipulating OSPF. But that's all you have freedom to do,
more or less. >> So, having mentioned OSPF. There's another natural question,
which is. Well, what about all of the other routing
protocols we use in Enterprises and on the Internet. Namely BGP. So let's review what BGP is. 

BGP is the border gateway protocol. So this is the standard global
scale Internet routing protocol. And what BGP does is it allows us to
essentially, do something very simple. If I'm a router in part of 1AS,
and you're a router in another AS. I can offer you routes
to certain destinations, along with some metadata like
the sequence of AS's along the path and maybe some tags and community information. And then,
you will collect a series of routes. A bunch of options at the various
destinations and you got to pick one of them, which of your neighbors you'd
like to forward the information to. So this is called a path vector
protocol because you get a vector which is the encoding of
the path for each destination. You have these options. And the path being recorded
there in the announcement allows us to make sure that
there aren't any loops in it. >> Precisely. Let's walk through the simple example
to see how BGP works in practice. This is a very high level discussion,
we'll be omitting factors that are not going to be relevant to
the data center for example.

On the internet,
if I must say one of the most important features BGP is being able to use
policy that's economic policy. We have relationships with other ISPs
that you're connected to, use that policy to distinguish who you are going to
forward or expose routing information too. So that's something
that we'll ignore here. 

We'll just focus on BGP's
path vector protocol measure, te very basics of how
it propagates routes. So in this example we have a few
different autonomous systems, AS's, which are connected to
each other in this network. And this AS's that we are going to
look at AS1 is going to propagate some announcements for this IP prefix to
other nodes, to other neighboring AS's. So it sends out these
announcements to its neighbors. The neighbors then further might choose
to propagate those announcements as shown here. Now AS2 has already seen a shorter path to this IP prefix because its
connected directly to S1. So it'll ignore the announcement from AS5. Further, AS2 can forward that announcement
to the other two AS's, AS3 and AS4. At this point,
everyone has reachability to that prefix. So this is a summary of how BGP works. Notice that the parts are stored
as a vector as Brighton mentioned, in the routing table itself. >> BGP, in fact, EBGP, which is
the inter domain part of the protocol. Is now being used in a number
of major data centers as the routing protocol between
switches within the data center. That's, at some level, it's kind of
surprising that we take this Internet scale protocol and Use it there,
but what does that get us? 

Well, first of all it's IP level, so we do get that aggregation
across groups of IP addresses. So, it avoids the layer two broadcast scalability issues, again
since this is a layer three protocol. BGP is a very well tested protocol that
is in many vendor implementations. And, allows us to use ECMP like several
of the other options that we just talked about. Just to build off what Brighton said,
unlike OSPF, BGP was designed to be used in such a way,
as to be interoperable. So I could be an ISP in Switzerland. Brighton could run an ISP in the US. And BGP should work fine. Regardless of how our implementations
of BGP ended up being built. So they could be built completely
independently of each other and they have to work together. So this is something that vendors ensure. So BGP can provide much greater
interoperability than something like OSPF which might be designed for
one domain in many cases. >> 

We do also have to acknowledge
some disadvantages of using a protocol like BGP here. Because it's layer three and not layer two, virtual machine
migration is going to be more complex. And we discussed that in another module. There will be slower convergence, particularly in BGP, not a protocol
that converges at microsecond scales. You can tune it. But there's still going to
be delays as this distributed system finds new
paths in the face of a change. And finally, when you're deploying BGP, there's along with the flexibility and
control over routing, comes with a large set
of possible knobs and dials to tune the protocol that makes
configuration potentially more complex. So, let's take a step back and
talk about what we've seen. So, we saw a handful of different
protocols that looked very different, Trill at layer two and
OSPF, link state and BGP. A protocol traditionally designed for the Internet now being used even
in a network within one building. So what's going on there? Well, there's actually some commonality
between all of these designs. If you think about what was insufficient
with the spanning tree protocol. That was a reasonable protocol
if we have a tree-like network, where the problem of finding
paths is a lot simpler. But now as we get larger scale
data centers to support lost of East-West traffic. We've basically got a pretty complex
network, especially if you think about conditions like failure where
the topology becomes irregular. Got a pretty complex network now,
even within one building. So that's why it makes sense
to take a general purpose Internet scale routing protocol and bring
it into the data center and use it there. And that's kind of a feature of
all the designs we talked about. That whether it's at layer two or
layer three, there's basically now a pretty good
general purpose routing protocol that we're using between
switches in the data center. >> What Brighton was saying also
leads us into a separate point about exploiting the richness
of these complex systems. So you have these topologies
that no longer look like trees. They have multiple paths between
various sources and destinations. And we've installed them perhaps
using these general purpose routing protocols into the routing tables. Now, how do you use those multiple paths? How do you decide what traffic goes
on this path versus the other path? You need some idea of what
the network's conditions look like to be able to make these decisions. If some paths have failed, perhaps you can
fall back on other paths without waiting for the routing protocol to converge. As we noted earlier, routing protocols
can take on the order of a second in the case of BGP particularly to converge. So using this backup connectivity
is really important. So, this is what we look
at in the next lesson. How to use multi-path routing in
realtime to work on these problems. [MUSIC]