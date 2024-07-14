---
id: mp4
created_date: 10/12/2022
updated_date: 10/12/2022
type: note
---

#  mp4

## 📝 Notes

10/12/2022:12:81
![[mp3]]

## Static IP Assignemnts

	(core switches && static vlan routing assignemnt) CAUTION:
	
		- not all Ts use same amount of bandwith & uneven load

## Topology

![[Pasted image 20221210120801.png]]

```ad-note md

## Scenario

Simulate a client loading a web page of multiple objects.


## Topology 

3 core switches, 4 edge switches, and 5 hosts per edge switch. 


## Infrastructure

There will be 3 different types of tenants, each with 4 hosts 

	
 - Iperf
	
		The 2 Iperf tenants consist of hosts running iperf to 
		simulate bulk transfers.

		iperf measures bandwith between computers
		
- Inactive

		Hosts that are members of the 2 Inactive tenants 
		will not transfer any data

		h5
	   h13

- Memcached:

		The Memcached tenant will consist of one client 
		retrieving memcached objects, in parallel, from 3 
		different memcached servers.

		**Memcached** (pronounced variously _mem-cash-
		dee_ or _mem-cashed_) is a general-purpose 
		distributed [memory-caching](https://en.wikipedia.org/wiki/Memory_caching "Memory caching") system. It is often 
		used to speed up dynamic [database](https://en.wikipedia.org/wiki/Database "Database")-driven websites by caching 
		data and [objects](https://en.wikipedia.org/wiki/Object_(computer_science) "Object (computer science)") in [RAM](https://en.wikipedia.org/wiki/Random-access_memory "Random-access memory") 
		to reduce the number of times an external data source (such as a database or API) must be read.

```

## Topology Tree

```dirtree

- /s105
- /s106
- /s107

```

![[Pasted image 20221210120801.png]]

```

Network Hierarchy

type: mesh

core
	edge
		hosts (in rack w/ tenancy association)

tenants

	iperf1: purple
	iperf2: green
	inactive: gray
	memecached: pink

```

## Network Policy

****"Flow Scheduling Policy"

### general policy

	Basically a load balencer 
	
	Traffic is routed among core switches regardless of vlan/tenant 
	association

	because all racks are connected in mesh --> core switches can 
	route to any edge as long as member of tenant in rack

###  rules

	- (iperf2) simulating bulk (large) transfers
	- (inactive) no data transfers
	- (memcached) 1 client retrieving objects, in parallel, from 3 
	  memcached servers

## Client Behavior

	C: request to memcached server & log response
	time.

	Request Count: 20
		r in R: 
			store response time 

		return median {
			load_time: self.load_time,
			95th_time: self.95th_time
		}

	response displayed at localhost:8080 bottom 
	dashboard

## Server Notes

### Entry Point

`controller.py`

### Open Flow

![[lefv/lib/openflow]]

## Application Interfaces

### Controller

	ryu-manager: used to manage server controller logic for sdn.

	example: `ryu-manager {controller.py}`
	

### Network Manager

	mininet: used to define the network specifications. 
	exmaple: `mdc [--user-defined-options]`

## 🔗 Links

## **🏷️Tags**

- 
