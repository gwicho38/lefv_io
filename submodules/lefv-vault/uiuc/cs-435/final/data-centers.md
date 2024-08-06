---
id: data-centers
created_date: 22/11/2022
updated_date: 22/11/2022
type: note
---

#  data-centers

- **🏷️Tags** :  

[](#anki-card)

## 📝 Notes

### Week 10: Data Center Applications, Traffic, and Physical Structure  

- What is special about networking in the cloud?
	
- How do cloud applications dictate the agenda for networking?
	
- How are data centers are interconnected physically for high bandwidth?

	
	
- See example data center fabrics deployed at Google and Facebook
- Data center application traffic patterns  
- Legacy data center topologies  
- Clos networks, including fat trees  

## Questions/Thoughts

Scatter-gather traffic pattern:

	context: web query

	example: bing web query 
		![[Pasted image 20221122230329.png]]

Traffic Volume:

	Web traffic (potentially within facility) growing exponentionally.

### Traffic Locality:

![[Pasted image 20221122230857.png]]

Network Hardware Hierarchy:

rack < block < cluster < dc

### Flow Characteristics:

Concurrent Flows

Flow Arrival Rates

	at the cluster scale - the flow arrival time is in the thousand ms

Flow Sizes

	![[Pasted image 20221122231633.png]]

### Implications for Networking

![[Pasted image 20221122231813.png]]

![[Pasted image 20221122232413.png]]

#### Notes

Redundant requests can help improve performance.

Acceptance of poor results (e.g., go with a less than 100% response from server)

### Clos

![[Pasted image 20221122233630.png]]

Each device has 8 ports multiplex for 32 port network

### Folder Clos

![[Pasted image 20221122233658.png]]

Scaling:

Increase # of layer or increase # ports at device

### AWS Invent at Scale2014 James Hamilton

East-West Problem



## 🔗 Links
