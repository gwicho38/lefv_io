neighbors (edge) --> iff nodes can 'talk to each other

link cost and adjacency do not overlap

	link cost --> if we were edges then what is path cost
	adjacency --> if the nodes are neighbors

need to handle:

	handleNodeUp
		updateConnectionState
		updateFwdTable
		sendUpLSP
		recordConnectionTime

	handleNodeDown
		updateFwdTable
		sendDownLSP

	sendKeepAlive

	handleSend
		logIfSendSelf
		logIfSen
		dUnreachable
		logIfSend
		send

	handleUpdateCost
		floodIfConnected
			updateAdjMatrix
			updateSequenceNumber
			sendLSUpdate
			updateFwdTable

	handleLSUpdate
		getCost
		getSequenceNumber
		getTTL
		checkIfTTLAlive
			updateCost
			floodCostToNeighbors

	handleForwardPacket
		logIfForwardSelf
		logIfForwardUnreachable
		logIfForward
		forward
