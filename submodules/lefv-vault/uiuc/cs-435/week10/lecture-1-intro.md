## Cloud Infrastructure

I'm Brighten Godfrey. >> And I'm Ankit Singla. >> Welcome to our class

on Cloud Networking. >> In this course, we learn how networking works inside

massive scale cloud infrastructure.

The data center is a tens of thousands of servers connected into a network. Consolidating compute into such large facilities yields benefits for multiplexing. You're sharing the same infrastructure for many different applications. You can also use economies of scale. And what's special about networking in the cloud?  Well, that's a good question. Cloud computing brings new challenges for

networking and that's what we're going to be

learning about in this course. To begin with, these networks are huge.

Tens of thousands or even over a hundred thousand servers

in the largest data centers today. And the applications that

these machines are running are big data processing applications

that need much more high performance, connectivity between the servers. Not just the occasional communication

with the client out to the Internet.

Then in traditional data centers. >> So both these challenges, the scale of the network,

demands the applications place on them. Mean that the traditional techniques for networking clusters just do

not work in these settings.

So we'll look at the design for

the largest data centers today and see how they address these challenges. >> We'll see both how servers and switches

are connected together into a physical network and also how we deal with

traffic through that network.

The network needs to handle traffic

demands that vary across times. Further, when such large collections

of devices form the infrastructure, failures occur often.

They're not just the common case,

they're a way of life. So these concerns call for efficient and

fault-tolerant traffic engineering. >> On top of such infrastructure, run

a variety of applications, including those for big science, but also pretty much

every web application you can think of. Running these applications requires, as we mentioned, big data processing

across machines behind the scenes. But also they have new kinds of real time demands driven by

interactions with us humans.

So whenever you visit a website

that appears to be one interaction from your perspective. But in fact, behind the scenes

in the cloud infrastructure, there can be hundreds or even thousands of

queries to back end servers in order to assemble responses and

give you the web page that you asked for. >> So if you examine the traffic patterns

that the applications create and the challenges that springs for networking in these settings,

the diversity and the nature of these traffic patterns is another

key difficulty in cloud networking.

To give one example,

we're going to learn how TCP's design is pushed to its limits by traffic,

characteristics, and data centers, and how the resulting performance problems

are being dealt with today in new ways. >> And of course, given that all of this

infrastructure is being shared not only across applications, but also in public

clouds across multiple paying cloud users, we need isolation across these users and

applications. Not only in terms of performance,

but also in terms of security.

This forms another major team that's

different than cloud networking. >> We'll learn about addressing this

need through network virtualization. Furthermore, with the large

number of devices and the dynamic environment of

data centers spinning up and down new virtual machines and so on,

configuring and managing the network the old fashioned manual way is

error prone and becomes infeasible.

Thus we're going to discuss architecting

networks using software defined networking, which exposes an abstract

centralized view of the network on top of which network management

functions become programmable. >> So far we have been looking at

things inside the data center.

We'll zoom out later in the course and

get a broader perspective. Data centers are, after all,

one piece of the picture. Consolidating all of this compute and

storage inside of data centers also means that we are creating

a separation between users and their data and the services they use. >> So that physical separation

between humans and their compute and data is another key challenge for

cloud networks. To deal with this, the largest cloud

providers today run multiple data centers across the globe to provide better service

to clients in different geographies. So serving clients in Sydney from

New York isn't going to cut it. It's too slow, it's not going to be

responsive and feel interactive enough and it will be bandwidth inefficient. >> But then, how do we connect these

multiple geographical distributed data centers?

We need to ensure freshness of data and

services across these sites and that can lead to massive

volumes of traffic across data centers over

expensive long haul connectivity. In this course we look at cutting edge

traffic engineering techniques for efficient use of that expensive bandwidth. >> So having that collection of geo

distributive data centers helps, but dozens of data centers

may not be enough.

We need thousands, tens of thousands

of sites to get very close to users. So many cloud services also depend on

what are known as content distribution networks, or CDMs for lowering

the distance, and thus latency,to users.

CDN spread cloud service across the globe,

ensuring most clients are within an acceptable distance or

latency to the cloud services. We're going to learn how CDNs work. >> Efficiently distributing content

across sites as well as directing clients to appropriate sites to get

their content as quickly as possible. Nevertheless, do have great urgency. They don't work for all you guesses. For example, with multi player online

games, users that are geographically widely separated need to be

connected at lower density. This is not a scenario in which

a CD will be very helpful. >> So we're going to briefly discuss

the value of low latency connectivity over the wide area public internet,

as well as what's causing the Internets large latencies today

And if you're wondering what this pigeon

is doing here with a loaded USB stick you will have to wait to find out you

don't want to miss that, would you? >> I would not. Throughout the course, not only will

we discuss networking techniques, but also the intuition behind them. >> We will see that the cloud

creates interesting challenges for networking, but also many

opportunities for network design. After all in these environments, the entire nook stack can be

managed often by one operator. >>

As a result,

the landscape is changing rapidly. In fact, the vast majority of techniques

we'll discuss in this class were invented within the last few years. >> And of course,

several challenges remain unaddressed, which means that applications must step

in to take charge of their performance. One example of this that we will see

in the course, these video streaming applications, which must make a careful

trade-off between video quality and the number of pauses they make for

buffering. >> On all the topics we just mentioned,

you'll see us in lectures, but we also have a programming assignment

component, where you, yourself, will manage your own toy network. You'll collect measurements, make

observations and improve performance for applications such as video streaming and memcached by improving a network

emulated on your own machine. >> The programming assignments

are designed to be small, easy, and fun. They do not require much background

outside of what is being discussed in this course. Taken together, they require you to fill

in 15, 20 lines of code, which if you have programming experience in any language,

should take you no more than a few hours. That said, the programming assignment

setup also provides opportunities for further tinkering and exploring. In addition,

there is a completely optional and ungraded assignment as well, which

involves you running a network measurement tool included with the programming

assignment setup, which gathers data and helps research on networking. With this data, together we can create

a latency atlas of the Internet, which we'll share with the class. >> Lastly, throughout the course,

we're going to enjoy some interviews with leading networking experts involved

in the design, architecture and management of big networks and

networking applications. These interviews will help cement

the concepts we learned and also give you a peek into

the practice of networking at some of the largest

services in operation today. >> The course website will

supplement the in-lecture learnings. And the course forums provide

an excellent way to ask us and your fellow students questions,

and to suggest improvements. We are excited to be teaching this course,

and we hope that you'll enjoy it. >> Welcome to the class. [MUSIC]
