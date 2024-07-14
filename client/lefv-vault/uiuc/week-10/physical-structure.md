[MUSIC] In this lesson we look at the physical
network infrastructure that underlies massive cloud data
centers such as this one. 

Actually, this is just a shopping
mall in San Francisco. But it's smaller than the size of
the largest data centers today and more of you probably been inside the mall
than inside a massive data center, so hopefully this gives you a better sense
of the scale of these facilities. Planning a large data center involves
many complex considerations, such as controlling the temperature and
the humidity. What you're looking at here
is a plan accounting for weather conditions in Prineville,
Oregon, in the United States, in connection with the Facebook
data center that's located there. Likewise, careful planning of the power
infrastructures are required. All of this physical infrastructure
supports a very dense area of servers of network gear which might
look something like this. This is NASA's Columbia supercomputer. The compute servers
are arranged into racks or cabinets which are lined up on
the data center floor into aisles. Let's take a closer look at how these
servers are networked together. In the manner you just saw, servers
are typically stacked into racks for various reasons, including management
ease and space efficiency. ==Servers in each rack are connected
to a top-of-rack switch==. The top-of-rack switch supports full line
read communication between all its ports. So, if there was nothing
else in the network, these servers could talk to
each other at full lined rate. The data center, typically, is composed of a large number of set racks
which are then connected into a network. The network's task is to enable these
servers to work together on big data problems. If the network does not
provide enough capacity, the servers are bottlenecked on
the network and compute slows down. Increasingly, the traffic
internal to data centers is much more voluminous than
traffic to and from the Internet. Further this need is growing rapidly. Facebook, for example, has noted that
machine to machine traffic inside their facilities doubles at
an interval of less than a year. Google has put out similar numbers. So how do we design the network
to network these racks together such that the network
provides high capacity? What I would really like to build is
a big crossbar switch that connects all of its ports at full line rate. This is how it really complex and costly because of the internals
of that crossbar switch. It would need to have
in square connections. Well we could do this a limited skill. Although perhaps we would use multiple big
switches for capacity and [INAUDIBLE]. As long as the number of servers
are small, this approach could work. Designs along these line
were in fact built. This here is a picture of
a 2004 deployment at Google. A similar design was deployed
at Facebook as well. What are you looking at here is 500
bill server racks each with 40 servers each of it has a 1GB Internet interface. The top of racks themselves have four
ports that each are 1GB interfaces. Further the big switchers have 512
ports with 1 gig capacity as well. ==One thing you'll notice here is
the disparity between the capacity of the server rack which is 40 gigs versus
the top of rack's capacity going out, which is only 4GB==. This creates congestion. If all these servers wanted to
talk to the rest of the network, there's only a tenth of
the capacity available. As a result,
the traffic has to be very local. This restricts application deployment and
skill. Other disadvantages to this big switch
approach are that it's very expensive. All the large switches at
the top of this topology costs a lot of money because
of their high port density. Further, this is specialized equipment and is available only from a very
small number of switch vendors. A lot of it is proprietary technology,
involves special purpose management interfaces, and is really quite
inflexible and difficult to manage. Another disadvantage is that
next generation line speeds, for example if you're looking at this as
a 1GGB network, the next generation might be 10GB, and that will not be
available at the same port density. So, if you have 512 port,
1 gig switches in your network today, tomorrow you might not be able to buy
the same number of ports at 10 gig. That will typically start at a much
smaller port count like 48 or 96 ports. But perhaps the most serious limitation
to this approach is scalability. You're limited fundamentally in how
many servers you can have by the port count of these large switches. There are other ways to
scale the network though. One alternative is to build it as a tree. Instead of having just one big switch or
a few big switches, you organize your network hierarchy
of switches of increasing size. So at the bottom still set the racks and
their top of rack switches, which further connect to somewhat larger switches and
further on to bigger switches. This isn't quite a tree as you see it
here, but it's really just a tree and some redundancy. This approach allows you to trade off
scale of the network and capacity. So you might have more leaves or more racks here at the expense of
limited capacity within racks. This does have its own problems. As machine to machine traffic increases
you might see something like this. If half of the top of rack switches send
all their traffic to the other half, there will be congestion at
the root of this network. This restricts application deployment,
in that you have to carefully plan to deploy applications in
a particular part of the network. 

And that might not even be possible
at certain application skills. It also makes for
a very poor fault recovery. A couple of failures can partition this
entire network, leaving it dysfunctional. It also suffers from some
of the same drawbacks that we saw with the big switch approach. The switches at the top of the hierarchy
are still quite expensive and your skill or capacity are quite limited. 

As a result, another approach that has become quite
prevalent is to use class networks. These topologies were designed in
the 1950s for the telephone system. Though the driver was
actually quite similar, you want to connect callers to each
other without having them wait. Such a network supports an arbitrary
permutation of inputs and outputs, so you can connect any caller
to any other caller. Here, what you see is
an eight array class network, that is, each device in this
network has eight ports. Now, you might say that this actually
looks quite similar to the big switch approach we are looking at, but
there is a crucial difference. Here, all the blocks, all the building
blocks of the network are quite small. And you're putting them together to
build a larger switch, so to say. As you're looking at this,
each device has eight ports. But you're putting them together
to build a 32 port network. And all of these ports can communicate
with all other ports at line rate. This design has inspired
the fat-tree network which you can think of as
a folded clos network. Such a topology is built from
small switches throughout. In this example every
switch has four ports. ==There are two ways
scaling such a topology. One, is to increase
the number of layers and the second is to increase
the number of ports at each device==. In the example here,
we have three layers of switches. One at the core and
two at the aggregation. You can also have topologies
with larger port counts, for example, if you used 96 port switches
with the same three layer organization, one can build a factory with
more than 200,000 servers. This topology is in
a sense trying to achieve what the tree hierarchy fails to achieve,
scalability with high capacity throughout. This visualization might drive
that point home further. This is a visualization of a factory
with a few hundred servers, the servers are at the edge in gray and
the switches are in red, researches at the core are not shown here,
those would be at the center. As you can see, visually this looks like
a tree but all of those links that look like fat pipes are actually just
aggregations of small links. Such a topology provides a large
number of redundant paths between any pair of servers. In the example here, you see four paths
between the same pair of servers. This has benefits in that in front
of those batch, is congested, you can use an alternate path. You can design such a topology to
have full capacity throughout, and in this example both
layers has 16 lengths. But you can also over-subscribe it
if necessary, you might for example, have a smaller number of core switches. And it will have half the capacity of
that layer than at the lower layer. This will result in local clusters having higher capacity than
the network as a whole. So you might think of them as
placement groups for example. There you place applications that
interact closely with each other. Nevertheless, the use of this cluster
mentality does limit the skill of applications you can deploy. Google has deployed in its data
center similar topologies. One instantiation is shown here. As you'll notice, in this topology
there are large number of cables, which can be a problem for
physical layout. One solution to this problem is to
aggregate these cables into bundles, and to run them together on
the data center floor. Nothing is changing here
in terms of topology, you're only aggregating large numbers
of cables and laying them out together. The topology is the same as before. The link speeds are not changing, the number of cables are not changing,
it's only about physical organization. Notice also in this diagram, the block on
the bottom right, which says to external. This is the network's
external connectivity. So far, we have focused exclusively on how
servers in the network are connected to each other, but we also need a way to
connect them to the rest of the Internet. So here, you're creating them as just
other endpoints in the network, so you might connect VGP routers,
you might connect larger switches. In these spots,
to connect to the rest of the Internet. Coming back to our discussion of cable
aggregation, this is one example. You see here aggregates of cables running
under the floor of a data center. One point that bears mentioning
here is that long cables necessarily have to be optics. Copper does not work beyond a certain
length limit at these line rates. Loss is too high. In the design of these networks,
this can be an important consideration. The long cables, being optics, need transceivers which are more expensive
than the equipment used for copper. As a result,
one might vary the topology of the network in such as way as to
have fewer long cables. Variants of this network design
are actually quite common. Here you see examples from Microsoft and
Facebook showing topology deployments in their data centers that are quite
similar to what we just saw. So several big players seemed to
have converged to the same design. Nevertheless, there are other
design possibilities too. For example, here you're looking at
the 3D torus on the left that's used in the garden system at
San Diego Supercomputer Center and on the right is the hypercube that's
deployed in NASA's reality system. Different trade offs come
from different topologies. For example,
if you're looking at the 3D torus, that's a topology that's
highly locally connected. Nodes only connect to
a few close neighbors. Such a topology might be excellent for
simulating physical processes. If you're looking at climate simulations, you might consider chunking up
the atmosphere into blocks of air. There, blocks of air will only communicate
with nearby or adjacent blocks of air, in which case the application will
mirror the 3D torus connection pattern. Likewise, other topologies could be
very useful for their traffic patterns. The 3D torus might not be
a very good candidate for map-produced-like applications where
a large number of servers communicate with other large number of servers. Here we've looked at topologies,
some of them, isolation. But soon we'll tie this
discussion to routing. Routing and topology have an interplay. Routing effects topology design, as
well as topology design effects routing. [MUSIC]