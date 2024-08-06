[MUSIC] So far we have talked about routing. In that How do we find
paths through the network? Now, the question is how do we use
these paths for forwarding packets. That's what we look at next. Besides basic connectivity, we also want
full tolerance and traffic engineering. 

These are both things
multi-path routing helps with. The example we will work with throughout,


Is the factory depology, which has been noted before,
has lots of parallel paths. For example, between these two servers,
there are these four parallel paths. Can we exploit these paths for
full tolerance and traffic engineering? The goal of traffic engineering is
to minimize network congestion. 

So you want to spread traffic
throughout the network. While ensuring that none of
the paths are congested, or at least most of the paths
are not congested. This is a difficult problem for
several reasons. 

First, in these networks,
as we've discussed before, there can be a large number of
flows which are very short. So imagine that you are trying to gather
information about the network's current state, the traffic's current state, and
that state is changing quite quickly. Which bring us to the second problem. 

The problem of traffic engineering
that is load balancing it for traffic is computationally expensive, so you trying to gather information
about the network state. You're trying to solve this
computationally expensive problem, and push out the results to the switches
to make forwarding decisions. This brings us to the third concern. You'd like to solve this
problem in a distributed way so you don't incur this challenge of
collecting information quickly and making decisions and pushing them out. A distributed algorithm Is
not that easy to develop. For all of these reasons data center
operators settle for inexact solutions. The most common of which is randomized
spreading of traffic with ECMP. 

ECMP is Equal Cost Multi-Path Routing. So let's see how ECMP works. To send traffic between these two nodes
the sender that's the server on the left they forwarded packets to the switch. The switch now has two choices,
known from the routing protocol so the routing table entries might
look something like this. So these are routing table entries, that are routing protocols has already
installed in the switch routing table. 

ECMP's method of deciding
how to forward packets is to simply pick one
of these path randomly. So it might choose port 1 for packets distant to 10.2.0.3 but
this poses a challenge. Packet spring is a problem for TCP, so
if you're making individual decisions for different packets, and those packets end
up with this random selection on different paths, that can be a problem for TCP. Let's see why. Let's say the first packet ends
up going through this path. It gets cued behind several other packets
in the buffer at that other switch. In the meanwhile, the second packet, with a different random choice, ends up at
this switch where there is no packet cue. The buffer is empty and the packet
goes through to the destination. Finally, at some point,
the first packet arrives here as well. Now the packets are reordered. And if the reordering is significant,
TCP can consider this a loss and that will mean the TCP will
drop throughput by half. If this happens often enough,
throughput will be very low. 

The solution to this problem
is to use flow-level hashing. What ECMP does is it uses
the hash of the packet's header to decide which of
the random choices to make. So the output port is determined
as a hash of the packet header. Further, ECMP can be done
independently at each hop. In this example, we have two
choices at the first switch, and then you have two choices at
each of the successive hops. There are no further choices
from the root switches. Each of the root switches
leads to one unique path to the destination in this topology. This gives us a total of four
path choices in this example. As you can see, ECMP's mechanism is really
quite simple, and it works well for both layer two and layer three routing. 

This randomization based
approach works quite well for a large number of small flows. However, randomization will sometimes
lead to imbalance in flow assignments. This can cause long lasting congestion
if multiple long lasting data flows are mapped onto the same set of lengths,
as in in this example. So you have two of these flows
mapped onto different lengths, but the other flows end up mapped by
randomness to the same set of lengths. As we noted earlier, we cannot do
randomization at packet level, which would get rid of this
problem to a certain extent. Because that causes package re-ordering
and causes issues with TCB. However, we don't necessarily have
to do this at the flow level either. This is where the idea
of a flowlet is useful. Let's look at the details of that concept. Let's say what you're seeing at
the bottom is the packet stream coming in at the center on the left. If the gap between groups of packets is
larger than the conservative estimate of the latency difference between
the two paths, we can send the packets, the packet groups, that is, on different
paths without risk of re-ordering. Such packet groups are called flowlets. This helps make load
balancing more fine grained. So yes, the poor packet choice is not
available to us because of a risk of TCP reordering but we don't have to do
things at a flow level as well. We can have something in-between the two. This idea was proposed by
Kandula et al in 2007. A more serious issue with ECMP perhaps,
is that ECMP only makes local decisions without knowledge of
failures further on the path. 

Let's look at another example. Here, as we know, the path from the root
downward is unique, so once the packet has arrived at that rightmost root switch,
there's only one path down to the server. However the links further upstream of
that part, the earlier searches going up, have no indication that that link has
failed and that part is unavailable. Thus, ECMP making only local choices
can do nothing to avoid this path. Note how on this topology,
a failure-free path was available. But some of the traffic
ended up on the failed path, because of the randomized choices. Recent work has proposed
a solution to this problem. This is very recent work called CONGA,
from CISCO Systems. The key idea is to monitor congestion
on paths in real time, and pick the least congested path. One [INAUDIBLE]. This requires maintaining a table at every
lead switch for every destination switch. There you keep track of
the extent of congestion on each of the parts within
these two switches. And then, you will pick the least
congested path on [INAUDIBLE] basis. Let's look at an example. 

From switch A,
which is connected to the left host here. There are four different
paths to the target switch. And these paths each have
different extensive congestion indicated by these values in this table. Three, seven, two,and one. The least congested path is path four. So for the next flow light
that comes in at this switch, Path four will be selected and then
the counters will be updated accordingly. Lots of details go into
making this work in practice. For example, instead of actively probing
the condition between every pair of searches along every possible path,
the data is piggybacked on data packets. So we've exchanged some data
packets with another search. You can add the information about
congestion between these two searches, on these data packets. Even so, this approach may not scale for
the largest data centers. This is an active research space
with a 2014 research proposal already implemented in switches. So who knows what exciting new proposals
we can expect in a few years from now? Again, to reiterate, we have single-entity
control in these facilities. The switch forwarding tables are quite
large, tens of thousands of layer two and layer three entries in routing tables. The topology is known and
is controlled by the operator. Topologies have lots of link and
path [INAUDIBLE]. So watch out for
more interesting developments. [MUSIC]