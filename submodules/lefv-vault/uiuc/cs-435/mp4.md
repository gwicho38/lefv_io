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
		
- Inactive

		Hosts that are members of the 2 Inactive tenants 
		will not transfer any data.
	
- Memcached:

		The Memcached tenant will consist of one client 
		retrieving memcached objects, in parallel, from 3 
		different memcached servers.

```

## Topology Tree

```dirtree

- /s105
- /s106
- /s107

```





## 🔗 Links

## **🏷️Tags**

- 
