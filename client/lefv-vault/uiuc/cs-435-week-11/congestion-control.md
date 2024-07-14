[MUSIC] Hi, in this lesson,
we're going to discuss congestion control. This is one of the core topics in any
networking class that you might have in undergraduate institution, or background
from running networks operationally. So here, we're going to focus on
just a high level refresher and then talk about what's new in the cloud. >> In this example scenario,
we have servers stacked up in a rack, connected to a switch, which is
connected to another network switch. Now you have some traffic
flowing through this network. In all of these flows you will see
are sharing that link between the two switches. The question congestion
control answers is. How's this capacity shared
across these flows? At what rate does each
sender send traffic at. And why does this matter? >> Well. the right rate is important to get,
because, let's see, what happens if we send larger than the available capacity
that's appropriate for this flow? We're going to get packet loss, we're
going to get delay, as we'll discuss. And we're going to get an unfair capacity
distribution, maybe between your flows. But also maybe between different
tenants in the data center that you would not want to be interfering
with each other in terms of performance. On the other hand if you send at less
than the available capacity, you have inefficient use of the network that can
also harm performance of applications. So, Anca, what's hard about this? >> The problem is hard,
because the capacity is unpredictable. The available capacity for
any sender is not really fixed. It depends on the scenario. If you're building a general
purpose protocol, like TCP say. And the sender may be in
different environments. It could be a wide area environment. It could be a data center environment. It could be a shared medium, or it could be an exclusive
connection between two devices. All of this is not really known because
it's a general purpose protocol. Also, the dynamics of traffic
make things more complicated. Traffic could be bursty. Flows can arrive at microsecond intervals,
and there could be a large number
of flows at any given center. All of this makes
conditional control hard, because we want to make
independent decisions by senders. So, how do we address this problem? >> Okay, so
the basic mechanism we have for this in traditional congestion control
is an end to end mechanism that is the sender is going to send us
stream of packets through the network. We don't get any information directly
from the network gear, the routers and switches. But when the receiver receives a packet
it will send acknowledgements back. And this tells us first of all we
know that data was delivered, and which data was delivered. So that we can ensure that
the correct data is in fact reliably delivered after we
retransmit if necessary. But also we get some hints about how
quickly the data is being delivered. And whether some is lost, in which
case it's an indication of congestion. So that's the basic idea
of acknowledgements. >> Right, and these acknowledgements help
set up what is a natural feedback loop. The sender treats
the network as a black box. Sends in packets to this black
box network to the receiver. Waits to receive ACKs from the receiver
in one round trip time, or not if the packets are lost or
the ACKs are lost. And adjusts descending rate based
on this feedback in terms of ACKs. And of course this loop continues. So, how does the feedback
affect the rate of the sender? >> Well, the basic idea is that if all of
our packets are being acknowledged we'll increase our rate, because it's an indication that
there's spare capacity in the network. If we're seeing packet losses, or packets that are presumed lost,
then we will decrease our rate. Now, this is of course hiding a lot,
because when exactly do we take these actions, and how much do we increase,
how much do decrease in a given scenario. So we're going to skip the details, there
are linked resources on the course web page, and instead focus on what
changes in the cloud environment. But we'll do just a brief overview. >> Right. So here,
what you see should be a familiar graph. This shows how TCP adjusts the rate in
response to feedback in terms of hacks. The details of this vary across
different flavors of TCP. But the rough idea is the same. What you're seeing on the x axis
are essentially iterations of that feedback loop. And the y axis is the sending rate that
TCP is achieving in that iteration. So here, TCP's attempting to match
the network's available capacity, by reacting to the network's
treatment of its packets. >> We have to start somewhere. So that's the first question. Where do we start? And, TCP starts conservatively
with just two segments for the first window that it's sending. And then as the feedback coms in each RTT, each round trip time
from sender to receiver. We double the sending rate until if we hit a packet loss then we
exit this slow start phase. Now, you'll notice the slow start phase
is slow, because it started slow. But it actually increases very quickly
exponentially until Iike I said we hit that packet loss and then we move
into the additive increase phase. >> In the additive increase phase, TCP's
rate does not increase exponentially, as Greg mentioned for slow start. Rather, the rate is
increased interatively, in response to hacks being receives. What happens when we lose a packet? >> Well, when we lose a packet,
that's an indication that. Now we've exceeded the capacity, and
we're going to conservatively back off, generally by a factor of two
in the classic TCP program. >> High points for Griffindor. What's not shown here is TCP time outs. Once TCP loses a large number
of packets consecutively, say an entire vendors worth of packets,
TCP times the connection out. Which means that after a long delay it'll
start again from slow start, and that long delay can be 200, 300 milliseconds, which
in data center time scales is an age. Next, we'll talk about some of
the problems with TCPs congestion control. Some of these are specific to
the data center environment, and some apply more broadly. [MUSIC]