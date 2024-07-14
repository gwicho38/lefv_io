[MUSIC] So, that was an interesting lesson. So, we saw how server virtualization
has some implications for networking. 

So, actually virtualization
is the life blood of cloud computing in a sense because it allows
us to get better economy of scale of compute, storage, memory resources. But that also actually means that the
network dips deeper into the host, right? Yep.

Because we have to virtualize the networking resources among
the VMs on a single physical machine. >> True.
And that exposes certain trade-offs at both flexibility and performance. Flexibility in terms of things like being
able to migrate virtual machines quickly, together with their network state. And, general purpose forwarding logic,
right? You can have a series of
operations on any single packet before we actually forward it. You might have firewalls or
access control, for example. >> Load balancers. >> Right, so that on one hand,
and performance on the other, Because you don't want to compromise
on the rate at which you move packets from the physical interface
unit per card, to the VM's memory. So you want the bandwidth, or rather the number of packets you can move
per second, to be as high as possible. You want that. Right.

So you don't want to compromise on either of those things and
it's an interesting tradeoff. >> And performance and especially performance consistency
is in fact one of the challenges. >> Right.
 For virtualization, so in the network one way to solve that
is you allow the hardware itself, the NIC hardware to understand
that virtualization. And allow it to multiplex between different-
 SRIOV. >> With SRIOV. So that's one side of the tradeoff space. And then at the other side
of the tradeoff space, we get a lot of flexibility but
some challenges in worst case performance with a software
switch like open virtual switch. >> Right. So going forward it might be interesting
to see if the advantages of these two approaches can be married together, right? >> Mm-hm.

Right, if, for example, we had some limited programmability
in network cards themselves. You're not talking general purpose
programmability like with FPGA's, which can be expensive, but rather only primitives that
network pipelines typically use. General purpose rule matching,
for example, right? Packet classification. If that can be generic enough in hardware
then we could have both the advantages, flexibility and performance. >> Great, looking forward to it. [MUSIC]