---
id: notes
created_date: 13/10/2022
updated_date: 13/10/2022
type: note
---

#  notes

- **🏷️Tags** :  

[](#anki-card)

## 📝 Notes

 ## How Big Should Send Window Be?

```
SWS = BDP (Bandwith Delay Product)
BDP = xonThroughput x RTT

Example: 

10 Mbps Throughput, 0.5 second RTT

BDP = 10Mbps x 0.5s = 5Mbps

Example 2: 
10Gbps tput, 15ms (0.015)
10 Gbps / 15 000 000s = 10 * 10^9 


```

## How big should sequence number space be?

```
MIN >= SWS + RWS
```

## Rate Control Heuristic

```
rate aka rateControlWindow = SWS/RTT

sender ensures <= min(SWS, rateControlWindow) packets are outstanding
```

### Other Options

- packet pacing

### Example Process

1. Receiver decides on buffer size
2. Receiver advertises buffer size to sender (this indicates free buffer space)
3. Sender limits data sent

## Congestion Control

### Algorithm

1. On congestion, slow down
2. else, speed up

## Signals of Congestion

### Problem

	Generally no explicit signals

### Infer congestion via loss

	tract RTT and deviation using exp weight moving average (ewma)

### Infer congestion via latency increase

## TCP Congestion Control

	Slow start
		define **MSS** == max(sizeof(datagram-in-network-layer))

![[Pasted image 20221014220607.png]]

	Result --> congestion window grows exponentionally

	![[Pasted image 20221014220801.png]]

## 6.5 PDF 

	[6.5](/home/luis/Documents/onedrive/LuisOneDrive/Documents/Education/UIUC/2022/CS-435/lecture/6.5.pdf)

## 6.6 PDF

 [37YIPdFpEei3xw56fgKVxg_dffc3820d16911e8b52a91cba55ac6e4_6.6.pdf](file:///%2Fhome%2Fluis%2FDocuments%2Fonedrive%2FLuisOneDrive%2FDocuments%2FEducation%2FUIUC%2F2022%2FCS-435%2Flecture%2Fweek-6%2F37YIPdFpEei3xw56fgKVxg_dffc3820d16911e8b52a91cba55ac6e4_6.6.pdf)

## Practice Questions for Test

https://wiki.eecs.yorku.ca/course_archive/2012-13/W/3214/_media/chapter1_examples_problems_1slide.pdf

## Quiz Questions

### Problem 7

Question 7

Four nodes are connected in series: A –- 25km -- B –- 400km -- C -– 10 km -- D. The three links have bandwidth 4 Gbps, 75 Mbps, and 80 Mbps, respectively. The three links have physical lengths 25 km, 400 km, and 10 km respectively. The links are full duplex.

Packets are 1000 B, including headers. Use the definition that 1 Mbps = 1,000,000 bits per second.

1: 2 x T(p) A - B = (25 x 1000)/(3x10^8 x .66) m/sec => ()ms + 
2: 2 x T(p) B - C = (400 x 1000)/(3x10^8 x .66) m/sec => ()ms + 
3: 2 x T(p) C - D = (10 x 1000)/(3x10^8 x .66) m/sec => ()ms + 

1: 2 x (25000)m / 198000000 m/s => 0.25252524 ms
2: 2 x (400000)m / 198000000 m/s => 4.04040404 ms
3: 2 x () => .1010101 ms
1 + 2 + 3 => 4.39393938
Question 7

In the setting of the previous question, suppose the links are optical fiber, and keep in mind that the speed of light in optical fiber is roughly 66% of the speed of light in a vacuum. What is the approximate RTT of the A-D connection, in milliseconds? (You can assume that there is no congestion in the network, and give an answer for very small packets, so that the RTT comes from propagation delay rather than transmission delay. Give at least two digits of precision after the decimal.)

How fast can packet be transmitted?

Link Speed / Packet Size => 

	A - B => 4Gbps / 8000 bits

// Practice Problem 03
https://www.gatevidyalay.com/stop-and-wait-protocol-practice-problems/


## Problem 8: Highest Throughput for Stop and Wait

![[Pasted image 20221015005938.png]]

http://web.mit.edu/6.02/www/f2012/handouts/tutprobs/transport.html

TPut for Stop and Wait => PacketSize == 1000 bytes / 4.39 ms = 227.7904328 Kbytes/s

## Problem 9: Smallest Window Size

```
Question 9

In the setting of the previous question, suppose A and D are running a sliding window protocol. What is the smallest window size in KB that can achieve the maximum throughput of the physical path?
```


BDP = xonThroughput x RTT => 75 Mb/s x (0.00439)s = 0.32925 Mb => 329.25 kb

## Problem 10

RTT? 10 ms


# Key Equations

## Propagation Delay 

	T(p) = RTT / 2

## Transmission Delay

	T(t) = Packet size / Bandwith
	example: 1KB / 1.5 Mbps 

## RTT


	RTT(a: [], a.length > 1) => (a) => a.reduce((acc, i, node) => acc += tripTimeAdj(nodeA) x 2)

## Throughput for Stop and Wait

	ThroughPut = Packet Size / RTT

## Setting Window Size to Saturate Link

	MWS == BDP == xonThroughput x RTT 
	

## Questions/Thoughts

## 🔗 Links

- [Answer to RTT questions](https://gateoverflow.in/?qa=blob&qa_blobid=9126919402542058475)
- [Reference Slides on Sliding Window from UIUC](https://courses.engr.illinois.edu/cs438/sp2010/slides/lec04_reliable.pdf)
