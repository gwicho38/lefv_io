---
id: week-2
created_date: 31/08/2022
updated_date: 31/08/2022
type: note
---

#  Let's Build a Network
- **🏷️Tags** :   
[ ](#anki-card)
## 📝 Notes

### Control and Data Plane
- Control Plane: 
	- Routing. The control plane tells the Data Plane 'what to do' i.e., where to send packets. 
- Data Plane: 
	- Forwarding

### Graphs

```ad-note js
// Weighted Bidirectional Map
Graph - G = (V, E, c):
	V: S<Nodes> === Vertexes
	E: S<Edges> === Links
	c: c(E)

Note - N: {
	id: 
	value: 
	adjList: [Nodes.id]
}

// represents a pair of connected nodes
Edge: {
	v: {Node.id},
	w: {Node.id}
}

```

### Example Graph 1

![[Pasted image 20220831205743.png]]

### Dijkstra's Algorithm

function leastCostPath(G, s): 
	%%
	Given: 
		Graph G: (V, E, c)
		Source node s
		c(w, v) >= 0
	%%
	 %% 2D array where each row entry is a list representing least cost path from s to v in V%%
	return `[ [ ] ]` 

### Implementation

```typescript


function Dijkstra(V: [Node], E: [Edge], c: [cost], s: Node): {

	//initialize data
	let Distance [v] = V.map(v => v); //stores minimal known distance to each v from s
	let Predecessor [v] = V.map(v => null); //stores predecessor for best known path to v from s
	let Fronteir = V // Nodes not yet processed
	Distance[s.id] = 0;

	while (F.length > 0): {
		
		let v = F.pop(Node.getMinDistance([F], s).id); // the id of Node w/ min distance to s as measured by cost(s.id, node.id)
		
		__.forEach(v.adjList, (node) => {
			if (Distance[v.id] + c(v.id, node.id) < Distance[node.id]) {
				Distance[node.id] = Distance[v.id] + c(v.id, node.id);
				Predecessor[node.id] = v.id; 
			}	
		})
	}

	return {Distance, Predecessor}
}

```

### Example

![[Pasted image 20220831214020.png]]

### Example 2

![[Pasted image 20220831214714.png]]


```remark
Each time a node v is picked from the frontier F, the algorithm checks each of v’s neighboring links. So for each link (a, b), at some point the algorithm will check whether there’s a shorter path via a going to b, and at some point it will check whether there’s a shorter path via b going to a.
```


### Time Complexity

![[Pasted image 20220831215153.png]]


# Algorithm Overview

## Forwarding Table (Dijkstra's Algorithm)
	Dijkstra's algorithm outputs in network a forwarding table by calculating the least cost path between two nodes

	Examples: 
		https://www.freecodecamp.org/news/dijkstras-shortest-path-algorithm-visual-introduction/
		
## Network Discovery
### Link State Routing

![[Pasted image 20220905233709.png]]

![[Pasted image 20220905233805.png]]

![[Pasted image 20220905233825.png]]

	![[Pasted image 20220905233844.png]]
	
	1. Distribute local neighborhood information globally, so that everyone knows everything after gossiping. 
		![[Pasted image 20220905232143.png]]
		https://www.pluralsight.com/blog/it-ops/dynamic-routing-protocol
	2. Every node (router) runs a shortest path algorithm (e.g., Dijkstra's) to computer its forwarding table

### Distance Vector Routing

	![[Pasted image 20220905232849.png]]

	![[Pasted image 20220905233143.png]]
![[Pasted image 20220905233323.png]]


	1. Integrates 1 & 2 of LSR (to be continued)

### Path Vector Routing

![[Pasted image 20220905233408.png]]


![[Pasted image 20220905233449.png]]

### Routing Protocols Compared

![[Pasted image 20220905233524.png]]