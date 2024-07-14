# Policy Knobs in BGP

As we've learned, one of the main points of BGP used for inter-domain routing is to have customizable policy. 

So, we're going to put a spotlight now on how policy works in BGP. What are the knobs you have to play with and how would you want to use them? 

## BGP @ One Router

1. it receives advertisements of routes in these update messages for neighbors, 
2. it buys import policies among that pool of possible routes, 
3. picks routes, one route for each destination prefix and that is installed both in the forwarding table at that router, as well as it's considered for advertisement to this router's neighbors, and so, the routes flow from router to router to router. 
 
 Now, within this sequence of steps within the device, there are three places that are part of what implements policy, the import policies, route selection and export policies, and we're going to take a look at each of thnose. 

## Import Policies

	First let's the device inspect to the incoming route attributes, and this can be really anything inside the route. 
	
			Which AS did the route come from? 
			
			Did the AS path include a specific AS somewhere, halfway through the AS path? 
			
			Is it for a particular IP prefix? 
			
	When matching certain attributes, you can then take actions, 
			
			First, you can filter the route entirely, eliminate it, pretend you never received it, it's not going to be considered at all to be one of the selected routes  
			
			you could tag it with a local pref value, that'll be used in the next step. 
			
## Best Path Selection

	So, that next step is the best path selection. 
	
	You've got this pool of candidate routes for a particular destination, you'd have to know which one is best. This is done with the decision process, that goes through a long list of criteria to evaluate whether one route wins over another. 

### Step 1: Consider LocalPref value for each Node

	Typically, the Highest LocalPref value is considered as the first step. 
	
		So, this would be the most important policies that the network operator implements by having tagged the routes with higher or lower LocalPref values. 

### If localPref same --> compare len(AS.path)

		Now, if you have two routes that have the same LocalPref, then the decision procedure moves on to the second step, which compares autonomous system path length. 
		
		So, if you have a path of length two versus a path of length three, it will select the route with the AS path of length two. 

### If len(AS.path) same --> prefer routes internal to AS

		Now, once again, we may have two routes or even more that have the exact same AS pathway. In general, AS path lengths might only be a handful of different possible values between one and five roughly. So, there actually aren't that many different AS path length. 
		
		So, it's pretty likely that we get to that match, that are equal, which means we move to the next phase, which is typically the lowest origin type meaning, if I got the route from inside this AS, I'll prefer it, on the other hand, if it's a route to another neighboring AS, then that would get lower preference. 

### Apply Multi-Exit Discriminator

		Next codons, the Multi-Exit Discriminator, which is a hint that's given to us by neighboring AS. 

		Did I learn the route from eBGP or did I learn from iBGP? 
		
		What was the Lowest Interior Gateway cost? 
		
### Apply Business Rule to Break Tie
		
		Finally, if so far I still have multiple routes that have matched on everything the first six steps, then there's usually some sort of Tiebreaking, based on something fairly arbitrary like router ID or perhaps, router age. 
		
		I'm not expecting you to memorize this exact decision procedure, though you might want to know the top few elements in the selection process.


### Professor Comment

First of all, is this is quite customizable. Second, this is the typical decision process. 

It may be different for different router vendors and there's a number of places in here that are first configurable by the network operator, particularly the LocalPref value and then, the Interior Gateway cost, which would come from, let say OSPF, the Interior Routing Protocol. 

There's also interestingly, a few values that can be influenced by the neighboring AS. 

	In particular, the Shortest AS path length, which you might think is simply something that comes directly from the protocol, but it can actually be manipulated by neighbors to, for example, add additional entries to the AS path line. 
	
	Nothing stopping a neighbor from doing that, and that may influence what a particular AS does, and also this Multi-Exit Discriminator, which is a polite request from the neighboring AS to prefer routes through a certain router, rather than another router, if the two ASs are peered in multiple locations. 
	
	So, all of this can be overwritten, the particular AS making the decision can choose to ignore what the neighbor has told it, but it may be influenced in many case. So, after we finally picked the best route, we're going to use it at this router in our forwarding table. 

## Export Policy

### Potential Considerations

Similar to the Import policy, we're going to decide here, there may be various relevant attributes in the route

	- which AS are we advertising this to potentially? 
	- Where would the traffic flow through? 
	- Is it for a particular IP prefix? 

So once again, we can match on essentially arbitrary properties of the announcements, and take actions either filtering, so we don't advertise it at all or we can try to influence our neighbor, tagging the route with that Multi-Exit Discriminator value or what's called "community attributes" or even manipulating the AS path. 

So, if you put all of that together, it's a fairly rich space of knobs and dials for defining what the policy is. But how would you want to actually use them? 

### Examples Setting Import Policies

Let's take a look at three examples. 

### Example 1

The first example, is that you may want to prefer routes through a customer over routes through a provider. 

What do I mean by that? Well, there are several kinds of relationships between autonomous systems. This is a simplification, but it's a common and useful simplification, that the relationship between one AS and another might be a customer relationship. 

	*Relationships: Customer, Provider, Peer*

So, if one AS has another as a customer, it's going to get paid for providing Internet service to that customer. 

On the flip side, the other side of that relationship is that AS is a provider and it has to pay for traffic that goes through its provider, and there's another category that's called a peer, which is that two ASs can work out a business relationship, where they agree to exchange traffic without exchanging money, because perhaps it helps them both out. 

==It maybe helps them both avoid sending traffic through a provider. How you can implement this as with LocalPref.== 

	For example, we could do something like, tag routes based on which is the next top AS, 
	
	for different ASs, I know what my business relationship is to them. So, I'm going to say, "All right. 
	
		If it's one of my customer ASs, tag it with a LocalPref of 300. 
		
		If it's a Peer, tag it with 200. If it's a provider, tag it with 100," and this will then take precedence over AS path length. 
		
		Let's look at a little example here. So, If I'm in this network, this is from the perspective of this LocalISP AS2 here. So, from local ISP's prospective, AS1 is one of its providers, AS3 is a Peer and AS4 is a customer. 
		
		If we're talking about routing to this prefix down here 1.2.3.0/24, and let's say, it may very well receive three different advertisements for routes to this prefix. So, the Big Global ISP there, is advertising this route that goes 134. 
		
		The peer is also advertising your route, 234 and the customer is also going to advertise a route, which is just AS4. 
		
		So, as we receive these routes, they're going to get tagged with a LocalPref 100, 200, 300, and of course, we'll end up preferring the route with the Highest LocalPref 300, which will cause us to accept this advertisement here, meaning that traffic is going to flow in the other direction, directly to that customer. 
		
		So, in fact, this LocalISP will get paid for carrying that traffic. So, this influences how we pick the best path. This second example, influences what routes we share with others. 
		
		It comes from a similar business considerations, that we get paid for traffic to and from customers, but we don't get paid to carry traffic for a provider. In fact, we may actually pay for it. So in particular, I have no responsibility to help out my provider by carrying traffic for them. The way I can implement that, is with an Export filter, for routes before they flow to the peer and provider, and it can match on the AS path and block that route from being advertised, unless the next AS act as a customer. 


### Example 2 -- Blocking Non-Customer Routes
		
		So, let's say, for example, we've got this particular route from AS2 to AS3 to AS5 to deliver data to this prefix 4.5.6.0. 
		Now, LocalISP is going to make a decision, which of its neighboring ASs does it want to advertise that route to? Well, it's going to apply this Export filter at this point, before sending it to AS4. Is it okay to advertise the path 235? 
		Well, yeah it is, because I'm advertising it to a customer. I'd like to accept more traffic from my customer, because that's my job and I get paid for it. So, I'll send an advertisement for 235, for the destination prefix. On the other hand, just before potentially advertising that route to my provider, 
		I say, "Okay, should I advertise 235 to my provider? Now, if I did that, the provider might charge me money for carrying that traffic, and they should be able to forward traffic themselves without me helping, in this case along the path 135. So, I'm not going to export that route to my provider. 
		
### Example 3: Hot Potato Routing
		
		One more example, which is quite common on the Internet and it's called hot potato routing. The idea of hot potato routing is you want to get rid of your packet as fast as possible, because you're lazy. The question is among all route advertisement, which one uses the least of my resources? Think about this for a moment, how could you implement this policy with the BGP policy knobs, that we talked about, the decision procedure for selecting the best path? What step of that would allow you to implement hot potato routing? 
		
		So, one way you could do this and probably the most straightforward way, is to use the Lowest IGP cost step in the BGP best selection path. This basically finds the hot potato route, because that's what the Lowest IGP cost is. 

### Why Use Lowest IGP to Hot-potato Route?

	The IGP cost being the interior routing cost like from [[ospf]], so if I minimize that, that means the path that goes across my network is as cheap as possible. 
	
	If I really wanted to prioritize this, I would have to make it the highest priority thing, so I'd have to ignore AS path length. The result of this, is that, as we'll see different routers in one AS may actually select different best paths. 

#### Example
	
	Let's take a look. So, here's an example network, and let's say Cogent here has received three route advertisements. 
	
	So, Cogent has three different border routers, as you can see here, and each one of them has received a route to the destination over at YouTube. 
	
	The first thing that's going to happen, is that those border routers are going to select the path that immediately gets traffic off the network. Everything I'm showing in this example, is how traffic flows. I'm not showing the direction at the route announcements propagate. I'm showing the direction that the traffic will ultimately flow. 
	
	Okay. So, those three border routers we know it's going to happen there. The other routers inside Cogent, are going to look at the IGP cost and they're basically going to send traffic to the closest border router. The result of this is that, you don't have one AS collectively making a decision. You have separate routers that may make different decisions for their travel.

# 5.3: ICMP and Traceroute

## Professor Background

In this lecture, we're going to talk all about what happens when something goes wrong. How you diagnose a complex system is really critical in any distributed system. 

Traditionally, unfortunately, this situation within networking has been relatively primitive. 

## SNMP & the Management Planen 

There are ways of understanding the state on each device like forwarding tables or configurations. Traditionally, that's the domain of the ==simple network management protocol or SNMP== to monitor state on network devices. 

There's recently been a rejuvenation of this area and movement towards more modern techniques, so the industry is making progress with good APIs, common tools like NetComf, network verification approaches, all of this is one aspect of a larger domain of what is sometimes called the management plane, an allusion of course to the data plane and the control plane. 

### Management Plane Redux

#### Monitor State

The management plane is a set of systems and protocols that could be used by humans or code to configure and operate network devices. 

In addition to the state on individual devices, we could look at the traffic flowing through the device and perhaps learn about what's happening if traffic is being lost or where it's going. There's several ways to do that, one is with active end-to-end probes and you could do that at any layer, pings, application-level queries and so on. 

#### Monitor Traffic
You could monitor traffic passively, just see what's flowing through the network without actually sending data. 

### SNMP and ICMP

Something that facilitates monitoring in the data plane is the ==Internet Control Message Protocol==, and that's what we're going to take a look at in a little more detail right now. 

We actually mentioned ICMP before in the context of the Internet protocol, we're going to see in little bit more detail, then we're going to build on ICMP to perform diagnostics in the traceroute utility. Then, we're going to use traceroute to discover actual autonomous system paths in the live Internet, and you can even try this at home. 

## What does ICMP Do?
Okay. So, where does ICMP sit? 

	==It's performing error reporting for IP. It's technically a protocol on top of IP, that is if we look at the IP packet, the way you send an ICMP packet is to send an IP header with protocol value of one and then the data portion of the packet is going to have the ICMP layout with a variety of fields.== 
	
	But, it's more realistic to draw ICMP a little bit closer to IP because that's really more of a companion protocol than something that's built entirely on top of IP. Why do I say that? Well, ICMP packets can actually be generated in response to IP packet events like errors, and it's not just end-hosts sending packets end-to-end and building on top of IP, actually, ==both end hosts and network devices along the path might be involved==. 
	
	So, this can happen in several ways; ==ICMP packets can be initiated out of nowhere==, for example, 
			
			the echo request which is a particular kind of ICMP packet is used for the ping utility. 
	
			Timestamp requests as another example. 
			
 In addition, ICMP packets can be generated in response to other events and echo reply, 
	 
	 for example, that a router could send in response to receiving an echo request, a time exceeded if the TTL on an IP data packet dropped to zero. 
	 
	 A destination port unreachable message or a timestamp response. ==So each of these has it's own code in ICMP to encode that kind of packet==. 
	 
	 Given those simple basics of how a IP device can respond with certain error codes, we can actually build on this to do more interesting things, and that's what we're going to see with traceroute. 
	 
	 ==The problem we're trying to solve is this, how do we figure out where a packet goes==? This is obviously critical information if we're trying to localize a problem, maybe packet loss or an unexpected delay. 
	 
	 Typically, there's no log or record inside an IP packet of where it went, but this is going to be essential if we need to determine if there's reachability in the network and how and troubleshoot problems. 
	 
	  So, here's a slightly clever idea, if we send an IP data packet and it's TTL drops to zero, as we just learned with ICMP, we're going to get a ICMP time exceeded message coming back, so that particular kind of error condition. 
	  
	  ==Not only do we get that message, that message is going to contain information about the point that the packet was dropped==. So, here's the idea. 
	  
	  We're going to send a dummy messages with increasing time to lives, one and then two and then three. Those are of course unusually small TTLs if we were just sending data packets, regular data packets that we expected to get through to the destination, but we're not trying for them to get through to the destination, we want them to have an expired TTL and generate a ICMP time exceeded message. ==Then eventually, when this TTL is long enough when that packet reaches the end hosts we're going to presumably get an ICMP port unreachable back.== ==So, this is the idea that dummy message doesn't matter as much exactly what it is, it's typically implemented as a UDP packet with an invalid port. Let's see a little bit how this works==. So imagine I've got a source and a destination, 1.2.3.4, and 5.6.7.8. My phone here on the left is trying to figure out what the path is to the destination. 
	  
	   Initially, it has absolutely no idea. This is the Internet, it's not really telling you much of anything about what happens, who's put a packet in and hope it comes out the other side. Okay? 
	   
	   So, what we're going to do to try to discover what's going on is send a packet with IP destination 5.6.7.8 and TTL of one. We're just going to throw it out there and see what comes back. Low and behold back comes a packet with a different IP source address, 100.0.0.1 with a time exceeded ICMP code. 
	   
	   All right, now at this point, my phone here on the left, it can infer that after a TTL of one, one hop into the network, there's a device with IP address 100.0.0.1. So, we've learned something. That's the device that must have sent back that time exceeded message. Now, let's try it again only with TTL 2. So it goes further through the network and low and behold again we get an ICMP time exceeded message that comes back this time from IP source 200.0.0.1. So that must be the next IP level hop through the network. 
	   
	   All of these of course are IP level hops, there could be for example ethernet level hops in between that we're not going to see using this method. Finally, I'm going to send a packet with TTL of three and get back an ICMP port unreachable. ==This is how traceroute works or at least how we hope it works==. It's entirely possible that routers along the way or the end host may be configured not to respond to these messages, perhaps for security purposes or just because it's not considered important by the operator. 
	   
	   But typically, we'll find that a lot of the ICMP reporting is in fact enabled, and traceroute can discover a lot of a path. So, let's try it out. Let's actually try to trace some routes. So, what I'm going to do is I'm going to start at my computer, here, which is going to be located at UIUC, and I'm going to try to explore a portion of the internet. 
	   
	   I want to figure out how I get to several different sites, Illinois.eau, A site in Finland, a site in Norway, and a site in Greece. Let's take a look. So here, I'm logged into a server at the University of Illinois. Let's start with a simple test. I'll ping illinois.edu. Now you can notice several things here, this is an ICMP packet going out, comes back with different sequence numbers, and relatively quickly, just a fraction of a millisecond, but a quarter of a millisecond. So, this is clearly staying on a relatively local network. 
	   
	   If I do a trace route to the same server, let's see what happens, it's pretty short, and you can see a sequence of several hops along the path. Now, we get some IP addresses, we also in some cases get host names which tells us fairly clearly where we are. But we can't take these IP addresses. 
	   
	   If you recall, IP addresses are at a high level allocated with regional registries, and those registries maintain databases of who owns what IP addresses. ==So, let's go over to the American Registry for Internet Numbers and search their database for that IP address, and you can see that it's within a subnet that belongs to the University of Illinois, UIUC, and this is AS 38==. 
	   
	   So, now we have the AS number associated with the routers along the path there. Let's move to a traceroute that might be a little bit more interesting. So, we're going to go all the way over to Finland. 
	   
	    In this case, you can see first of all these later hops of the traceroute are taking longer are up to over 130 milliseconds. So, this is consistent with a path that is going fairly large distance across the world, all the way to Europe. 
	    
	    Based on host names, you can see there are routers along the path that are within the University of Illinois. Now, this one is not quite clear, we could take this IP address, and go back over to ARIN, and ask it what's going on with that IP address. This is also associated with the University of Illinois, although it's also part of another autonomous system number. We then go to a IP address that is associated with this cogent router. 
	    
	    If we take that IP address over to ARIN,  then what we're going to find here is cogent autonomous system number 174. Now further along, we do hit some routers where the provider might not be particularly obvious. 
	    
	    So, I can take one of these IP addresses, look it up, and when I put that IP address in, what you can see here is that it says, it's actually not giving me a lot of information. It says it's actually allocated to RIPE NCC. Now, RIPE is the registry that coordinates IP address assignment for Europe. 
	    
	    So, we have to pop over to a similar database that's hosted by RIPE. Enter the same IP address. Let's see what's going on. So, this is a internet service provider in Finland, and you can see the autonomous system number down there 16086. 
	    
	    Using the technique we just saw, we can map out what happens to these paths. At least, the portion that we were able to discover with trace route. So, if we take all those IP addresses we found and translate them into the autonomous systems that own them, this is what we find. So, you can see here that my host is directly connected to Illinois.edu via a single hop, stays within AS 38. There's a second autonomous system number associated with the University of Illinois system that's used for external conductivity, and for going to Finland or Norway, that takes us over to cogent, and then a couple regional providers before getting to the destinations. 
	    
	    The path to Greece to something per different, it goes to a regional ISP called Pavlov's media, before hitting Hurricane Electric, and then several associated autonomous systems. 
	    
	    ==Already we can see a few of the principles that are coming out here==. 
		    - So, there are separate autonomous systems that own domain of control but often, we have multiple autonomous system numbers associated with either the same organization or related organizations. 
		    
		    - We can also see that the path typically moves from more regional autonomous systems to a large backbone provider, if we're going along distance cogent and Hurricane Electric or two of the largest global carriers on the internet.  
		    
		    - Then, the path hits a regional provider near the destination. If we continue this across many, many different sources and destinations, and performed a lot of data cleaning to remove errors, we could end up with something like the map of the Internet that you saw in an earlier lecture that was produced by Keita. But now you can try this yourself. So, why don't you open up a shell for example the one that you're using in the Linux VM working with the assignments in this course, and try doing traceroutes to Illinois, and let's see what sequence of autonomous systems are between you and Illinois.edu. Give it a try.