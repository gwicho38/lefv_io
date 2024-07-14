So, Ankit, having seen these examples of applications, um, and the challenges they face, what should the application
designer do about it? 

There are possibilities for handling performance problems at the application layer. Forexample,
with detail latencies, so if you have these requests you're making and some of them are
coming late, out of a hundred, maybe a percent or two
are coming late. What you can do, with the candy example
as we saw, you can make redundant requests. Ask for the same object
from multiple servers and take whichever result
comes back first, 'cause it's something
that Google already does. Other than that you can also
just accept a poorer result. So you make
these hundred requests, some of them slower,
you don't wait for them. So if 95 come back, you structure the application
in such a way that that's good enough. So you just go
with whatever result those 95 responses give you. But ultimately these
are all compromises. The network should do better. And you just want the network to have high performance
for the application. Exactly. But that's not easy,
because, ah, the whole point here
is this is a cloud. And you're bringing together multiple different kinds
of applications, different tenants,
different customers, into one place. So the kinds of workloads
you experience might be- might vary a lot over time. I find very different
across applications. And you want to be able to place
any VM anywhere in the network um, to achieve the highest
utilization that you can. Ah, which means that not only are the workloads themselves perhaps, ah, unpredictable
how they map physically. into a location
in- in the data center might be, ah, unpredictable. So, ah, this will have
some implications on how we design
the, ah, structure, physical infrastructure
of the network. Yes, physical infrastructure, routing traffic, and terrain, congestion control. All of this we'll see impacts
from how we make it work. Sounds interesting. You will see all
of those topics in the course.