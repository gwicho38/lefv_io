---
id: 2022-11-10
created_date: 10/11/2022
updated_date: 10/11/2022
type: note
---

#  2022-11-10
- **🏷️Tags** :   
[ ](#anki-card)
## 📝 Notes


2022-11-10-11-16-09
1:1 With Dobrimir

- If I see something like too many hours surface this to Dobrimir. 


Go through the employee handbook and read what's expected. 

UI: 

PTS Architecture: 

	Output is persisted in Cassandra. Created partitions based on trajectories. 

	Batch Definition?

	What is a reasonable way to separate out a batch?

	IRModel.process is hit when you generate trajectory

	conceptually a generation run that corresponds to the timestamp of hitting process. 

	process --> irSpec and test trajectories.

	irRangeSpec specifies the distribution. 

BackEnd API Use Case for Batching?

	1. Data Science domain wouldn't be affected by this implementation. 
	2. Simpler implementation: do process per trajectory. 
	3. Store as file in n-dimensional array like nd-file source spec.
		1. Instead of having the IRTGR write to cassandra. 

TGR inherits on IRTrajectory. IRTrajectory APIs assume cassandra. There would be refactoring for things that use the TGR object. Persistance and fetching is what reliance. 

Trajectory:  

	Instead of using Cassandra, numpy generated output for generation. 

	Batches of trajectory output in numpy array. Save the array to an NDFileSourceSpec.

	Each trajectory generated would be part of a batch. When you go to fetch -- you grab the batch --> slice into the trajectories that you want. 

Delete a batch?
	[array]
	delete ndfilesourcespec

