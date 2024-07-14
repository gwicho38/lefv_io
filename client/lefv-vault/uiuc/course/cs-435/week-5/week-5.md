---
id: week-5
created_date: 01/10/2022
updated_date: 01/10/2022
type: term
---

#  - week-5
- **🏷️Tags** :    
[ ](#anki-card)
## Notes

# Planetary Scale Routing -- BGP Context

## Layers of Internet Architecture

![[Pasted image 20221001112953.png]]


## Challenges for Internetworking Cross Domains

- Routing Policies

- Privacy

- Security

## Routing Protocol Types

- Link State

	- all local information is global
	- each node suns shortes path (dijkstra) to compute forw table
	- domains declare routing policies globally 
	- can't account for business requirements as routing preferences

- Distance Vector & Path Vector

	- Routers exchange best known routes incrementally
	- Suited to local decisionmaking

# BGP

## Description

**Only** widely used *interdomain* routing protocol

## Autonomous System

AS underpins BGP architecture. 

### BGP Requirements/Architecture @ High Level

1. BGP Node advertise key: value of ASN: Routes

		Note: who gets ASN?
			- Multihomed orgs
			- One org can have many ASN

1. PVR where nodes are ASs
2. Metadata added to route info
3. Nodes are root of IP subnets

*How BGP Propagates Routes internally (among subnet) vs internally (among other BGP nodes -- aka ASs)

	Advertise and learn routes to subnets externally (to other ASes) with eBGP

	Propagate learned routes internally (within same AS) with iBGP

![[Pasted image 20221001120033.png]]

### Policy Determines Paths - not Distance

#### Path Advertisment with Policy Applied

*For example: all ASs route to the same subnet in the example below - but UIUC prefers Cogent (174)*

![[Pasted image 20221001120428.png]]


![[Pasted image 20221001120551.png]]

### Each AS is a Network

![[Pasted image 20221001120643.png]]

## BGP Protocol

	Requirement: BGP Routers maintain a 'peering' (*aka* adjacency) session between them.
	Implementation: TCP connection. 
	
![[Pasted image 20221001121019.png]]

![[Pasted image 20221001121225.png]]

### Delivering a Packet that traverses eBGP and iBGP

### Set up iBGP between each eBGP and each interior router

![[Pasted image 20221001121547.png]]


### Construct 'de-referenced' forwarding table

![[Pasted image 20221001122045.png]]

### AS Architecture will Govern How intra/inter domain routing interact

	Example Policies:

![[Pasted image 20221001122348.png]]

# Routing Policy in BGP

## Overall Policy Architecture

![[Pasted image 20221001124243.png]]

## Typical Best Path Decision Process

![[Pasted image 20221001124339.png]]

## Using eBGP Policies

### Prefer Customers Over Providers
![[Pasted image 20221001155930.png]]

### Block Non-customer routes

![[Pasted image 20221001155958.png]]

### Hot Potato Routing
*Get rid of route packet ASAP*

![[Pasted image 20221001165115.png]]

# Upshot

• Intradomain routing: share all information,
execute a single coordinated plan

• Interdomain routing: limit information, allow local
policy decisions

What BGP does well
• Flexible local decision-making by each domain
• Somewhat private information
- Policies & internal topology not advertised
- Still possible to figure a lot out end-to-end
• Somewhat improved scale when IP prefixes are
aggregated into larger chunks
- Still nearing 800,000 IP prefixes globally

![[Pasted image 20221001165342.png]]

# Diagnosing Routing Issues
### Device State
*SNP* monitors state on network devices

### Data Plane Traffic
*ICMP* passive traffic monitoring
E2E probes @ every layer

#### ICMP
	
	Key Elements:	
		
		error reporting for IP

		used for diagnostic traceroute

		TR --> used for AS path discovery

#### ICMP Error Reporting

![[Pasted image 20221001170900.png]]


	- companion to IP
	- ICMP packets can be generated in response to IP packet sent

#### Initiating ICMP Packets

		- Echo request
		- Timestamp request

#### Responding with ICMP Packets

		- Echo reply
		- TTL <= 0
		- Dest port !== found
		- Timestamp

## Traceroute

		- If IP packet TTL <= 0 --> ICMP Time Exceeded comes back to sender w/ information about point which packet was dropped
		- Send dummy udp messages w/ invalid port and increasing TTL:
			- TTL = 1, ... , End when ICMP Port unreachable received
			- 

# Links
- [[week-3]] 
- 