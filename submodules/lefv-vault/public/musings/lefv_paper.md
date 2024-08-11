+-----------------------------------------------------------------------+
| **Applying Diamond Model**                                            |
|                                                                       |
| **and**                                                               |
|                                                                       |
| **Policy Assessment**                                                 |
|                                                                       |
| **to**                                                                |
|                                                                       |
| **FireEye Incident**                                                  |
+-----------------------------------------------------------------------+
| PUBP 6725:                                                            |
|                                                                       |
| Information Security Strategies and Policies                          |
|                                                                       |
| Dr Brenden Kuerbis                                                    |
+-----------------------------------------------------------------------+
| April 30, 2021                                                        |
+-----------------------------------------------------------------------+

# Introduction

this post applies the Diamond Model to the cyberattack on FireEye,
Inc., a California-based cybersecurity company (FireEye). It proceeds by
describing and analyzing the incident within the adversary, capability,
infrastructure, and victim Diamond Model framework. The paper then
examines the Diamond Model's social-political and technological "meta
features" to contextualize the incident. Finally, this post concludes
by arguing that the problem of politically motivated cyber-attacks
carried out by an Advance Persistent Threat (APT) is best addressed at
the international level.

# FireEye Incident

FireEye reported that it was attacked by "foreign government hackers" on
December 8, 2020 through a press release. The release detailed FireEye's
assessment that the hack was perpetrated by a "government-sponsored"
hacking group seeking "information related to \[FireEye\] government
customers." \[1\] Of note, FireEye reported that its proprietary "red
team tools" were stolen. \[2\]

# Diamond Model Applied to FireEye Incident

## Adversary

FireEye claims that the adversary was part of a "nation-state
cyber-espionage effort." \[2\] There has not been an official report
attributing the adversary operator or customer. Unofficial analyses note
that the attack is part of a protracted virtual conflict between Russia
and Western powers.

One analysist asserts that the "Cozy Bear/APT29" hacking group was the
primary operator (with Russia being the Adversary Customer). \[3\] It
noted that "indications continue to implicate the SVR, the Russian
Foreign Intelligence Service, which serves as Russia's intelligence and
global espionage organization and is frequently referred to as Cozy Bear
or APT29." \[3\] Additionally, FireEye's attack appeared to leverage
similar techniques to those used in the SolarWinds incident earlier in
2020 (which has already been officially attributed to Russia). \[4\]

The intent of the adversary can also be imputed as being like that of
the SolarWinds incident: serve Vladimir Putin's domestic and foreign
political ambitions while stealing security assessment tools that could
help the Russians prepare for future cyber-attacks.

## Capability

APT29's capability is vast (as is the adversary principal's arsenal).
The capability employed by APT29 seems to depend on the faction(s) of
the hacker-group that carries out the attack. \[5\] It is thought to
operate through multiple drop points and low activity, use spear
phishing emails with self-extracting archive attachments, use Windows
LNK files, the Cobalt Strike rootkit, and use custom malware (known by
WellMess and WellMail) to target international organizations. \[6\]
Additionally, APT29's attacks have been reported to operate with a
toolset that shares many "functional" and "structural" linkages to the
MiniDuke, CosmicDuke, and OnionDuke malware components. These linkages
include UAC bypass, Registry Run keys, encoded PowerShell scripts,
self-signed certificates, and SDelete. \[7\] APT29's C2 infrastructure
is known to use redundancy paths that can use Twitter to look for
specific tweets from pre-made accounts with specific tags labeling
encrypted URLs to backdoors. \[7\] Finally, by exfiltrating FireEye's
"red-team" tools the adversaries have been able scale up their
individual capacity with little additional investment.

## Infrastructure

APT29 has steadily grown its C2 infrastructure (originally by
compromising websites that would install payload malware). \[8\] APT29's
infrastructure has been particularly studied vis-à-vis the HAMMERTOSS
malware identified by FireEye in 2015. \[9\]

First, APT29 leverages Type 2 infrastructure to build HAMMERTOSS's
instruction set and begin the data exfiltration. Once installed on an
infected machine, HAMMERTOSS typically builds and leverages its
infrastructure through a bifurcated process that calls out to its C2
server directly (Uploader) or through an intermediary (tDiscoverer).
APT29 appears to regularly use the tDiscoverer path. The tDiscoverer
path uses Twitter as an intermediate obfuscation layer before calling
out to the Uploader domain. \[9\]

To generate the C2 Twitter URL, HAMMERTOSS will create a Twitter handle
built on a time-based string concatenation algorithm. This algorithm is
shared between the C2 host and the victim malware. The infected PC will
then then continue to call out to the generated handle daily until the
C2 attacker chooses to register the shared handle on a particular day.
If the C2 URL was registered by the attacker, the attacker will then
include instructions (composed of a URL and a hash tag) pointing the
malware to seemingly innocuous content hosted on Github. Finally, the
image downloaded from Github will encode specific instructions directing
the victim to a cloud-storage server that is pre-configured by the
attackers as well executed by way of a Windows command shell script.

Second, APT29 depends on Service Providers to carry almost all
instructions and data to and from the victim PC. HAMMERTOSS depends on
the uniformity and predictability of the TCP/IP stack, leveraging ISPs
and domain registrars to provide reliable routing of their malicious
instructions. Further, CISA has cautioned that APT29 has specifically
used "Kerberoasting" to attack Microsoft Active Directory and compromise
Windows domain controllers. \[10\]

## Victim

The victim of the incident was FireEye. FireEye provides
intelligence-based cybersecurity prevention, investigation, response,
and remediation services. FireEye is particularly known for its work
uncovering state-sponsored hacking groups. \[10\] For example, it was
credited with identifying Russian military hacks against Ukraine's
energy grid in 2016. \[1\]

The "*victim persona*" was FireEye in its role as a cybersecurity
provider. FireEye's CEO, Kevin Mandia, unequivocally concluded that the
attackers "tailored their capabilities to target and attack FireEye."
\[2\] Additionally, FireEye noted the sophistication and novelty of the
techniques used to remain undiscovered and exfiltrate the targeted data
evinced a purposeful intent. \[2\]

The "*victim asset*" is a mixed bag. The primary asset sought was
reported by FireEye as being "information related to certain government
customers." \[2\] The desire to leverage government contractors as an
ancillary method of obtaining government data has many precedents, and
importantly, the end goal is evident -- using the information to attack
the Federal and State governments of the United States. A clear instance
of this was the SolarWinds Orion Security Breach, a.k.a. SUNBURST where
various much of the US Federal government was hacked by APT29.

However, APT29 is clearly opportunistic. In exfiltrating FireEye's
red-team tools, the group has shown an openness to redefine the assets
sought on an *ad hoc* nature. This willingness to improvise on the
assets collected suggests that APT29 wants its capabilities to be known,
highlighted, and grown.

## Event Meta Features

## *Social-Political Meta Features?*

FireEye provided APT29 with an enviable array of products sought by
politically motivated APTs: its client-base records and its red-team
tools/methodologies. First, FireEye's core business focuses on
"appliance-based detection and prevention of stealthy and targeted
cyber-attacks." \[12\] In its public filings, FireEye marketed itself on
its "relationships with governments around the globe, both as a
cybersecurity solutions provider and a trusted advisor." \[12\]
Practically speaking, intelligence gathering operations in any country
could "short-circuit" much of their intelligence-gathering process by
obtaining key-contacts through FireEye. Of even more note, the
SolarWinds SUNBURST incident earlier in the year was purportedly
facilitated by targeting government IT employees that were known (or
presumed) to have highly privileged accounts. It is likely that
similarly situated individuals would have been responsible for managing
the relationship with FireEye and were therefore attractive products for
APT29's consumption.

Second, FireEye also provided APT29 with an ancillary product that could
scale APT29's operations at an even greater pace than seen thus far --
its "red team" tools. While FireEye has reported that none of their
tools "contain zero-day exploits," these very tools provide APT29 with
first-hand knowledge of the testing tools used in testing American cyber
defenses. \[13\] In consuming FireEye's red team tools, APT29 can
therefore fulfill a two-fold need: (i) gaining insight into key
counter-defense information to better tailor future attacks, and (ii)
potentially raising funds by selling such tools to third parties.

Finally, APT29's demand for politically connected targets suggest that
its relationship with FireEye is likely to be more than fleeting.
FireEye is a market leader in cybersecurity services, establishing it as
a steady producer of future government contacts. While the effort
expended by APT29 to maintain operations against sophisticated actors
such as FireEye may be great, resource/time constraints appear to be
slim given the social-political posture of Russia.

## *Technology Meta Features?*

APT29's demonstrated technological capability is vast. With the full
backing of the Russian government assumed, the group has demonstrated an
ability to use social engineering techniques to perform sophisticated
spear-phishing campaigns, as well as build obfuscated redundancies into
their C2 infrastructure. Additionally, the structure of APT29's attacks
rely on the canonical TCP/IP stack, and is often structured to mimic
actions of legitimate users (e.g., HAMMERTOSS calling out to Twitter
only once per day). Finally, APT29 is known to target the very trust
frameworks that buttress the Internet. For example, the SolarWinds
SUNBURST attack spoofed Active Directory Federation Services token
signing certificates (referred to as the "Golden SAML" attack). \[14\]
In sum, APT29 represents an example of the pinnacle of sophisticated
threat actors whose actions known and leverage virtually all techniques
and architectures built into our current networking infrastructure. Such
sophistication highlights the wisdom of defense-in-depth strategies as
best practice.

## Diamond Model Diagram

![](media/image1.jpeg){width="6.5in" height="5.455555555555556in"}

# Policy Assessment to FireEye Incident

> The problem raised by the FireEye incident is how best to address
> politically motivated cyber-attacks carried out by APTs. this post
> argues that these incidents are best addressed at the international
> level.
>
> Arguments can be made that organizations and private industry are best
> equipped to handle what amount to isolated and infrequent incidents
> that create relatively few long-term financial impacts on firms.
> \[15\] Mitigating the vulnerabilities that precipitated cyber-attacks
> (APT motivated or not) often mirrors coordination and information
> problems found in common political-economic problems in the past.
> \[16\] Furthermore, risk pooling frameworks have also been shown to be
> effective in many industries. \[17\] In sum, the risks appear
> uncommon, risks posed can be minimized by pooling, and the intent of
> government actors can sometimes seem mixed. \[18\]
>
> However, a solution that does not address or decrease the incentive
> for states to partake in politically motivated APT attacks against
> private citizens only serves to incentivize actions of opportunistic
> autocrats whose domestic policy is shaped by destabilizing militarism
> abroad. \[21\] In short, APT attacks are violative of state
> sovereignty (and arguably acts of war) that if not dealt with only
> incentivize further escalation. \[22\] The result is that firms and
> industry can do little to organize where entire government industries
> are directed at carrying out cyber-attacks.
>
> While the risks of similar attacks on the same firms or even
> industries may be low, reported APT attacks occur regularly. \[23\]
> From a state or international perspective, the risks of unimpeded
> cyber-attacks are high. For one, small states could risk a scenario
> where dominant states force a protection racket leveraged around
> crippling domestic infrastructure. For large powers, it seems evident
> that opportunistic states are practicing an international form of
> *lingchi.* \[24\] If no global coordination exists to respond to such
> attacks, the door is left open for potentially cataclysmic escalation.
> \[25\]
>
> Finally, the lack of all-encompassing international coordination
> around APT and other state-sponsored cyber-attacks appears to be a
> driving factor for their continued use. \[26\] Part of the difficulty
> in reaching international consensus appears to be that many victims
> are often perpetrators that benefit from the lack of order. \[27\] In
> the abstract, the resulting scenario is arguably a classic
> Game-Theoretic instance of the Prisoner's Dilemma (lack of cooperation
> is therefore optimal). Yet, the real risk is that this continued
> ratcheting of tensions resembles a period in history that should be
> impossible for us to ignore. \[28\]
>
> Thankfully, the solution for this current state is clear: and
> all-encompassing treaty-based solution for state-sponsored APTs. Many
> multinational arrangements have been adopted: (1) Council of Europe
> Convention on Cybercrime, (2) Shanghai Cooperation Organization, and
> (3) ASEAN Declaration to Prevent and Combat Cybercrime. While each
> have their benefits/costs, all would be preferable to a state that
> appears to otherwise be destined for ratcheting tensions that will
> eventually boil over.

# References

#  {#section .unnumbered}

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  \[1\]    Guardian staff and agencies, \"US cybersecurity firm FireEye says it was hacked by foreign government\".
  -------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  \[2\]    FireEye, Inc., *Form 8-K,* 2020.

  \[3\]    S. Ingalls, \"eSecurity Planet,\" 18 December 2020. \[Online\]. Available: https://www.esecurityplanet.com/threats/fireeye-solarwinds-breaches-implications-protections/. \[Accessed 18 April 2021\].

  \[4\]    E. Nakashima, \"The Washington Post,\" 23 February 2021. \[Online\]. Available:
           https://www.washingtonpost.com/national-security/biden-russia-sanctions-solarwinds-hacks/2021/02/23/b77039d6-71fa-11eb-85fa-e0ccb3660358_story.html. \[Accessed 18 April 2021\].

  \[5\]    S. Vavra and T. Starks, \"CYBERSCOOP,\" 18 December 2020. \[Online\]. Available: https://www.cyberscoop.com/cozy-bear-apt29-solarwinds-russia-persistent/. \[Accessed 18 April 2021\].

  \[6\]    National Cyber Security Centre, Communications Security Establishment, National Security Agency, Cybersecurity and Infrastructure Security Agency, *Advisory: APT29 targets COVID-19 vaccine development,* 2020.

  \[7\]    Kaspersky, \"What\'s behind APT29?,\" \[Online\]. Available: https://www.kaspersky.com/enterprise-security/mitre/apt29. \[Accessed 18 April 2021\].

  \[8\]    Anomali_Threat_Research, \"APT29: A Timeline of Malicious Activity,\" \[Online\]. Available: https://forum.anomali.com/t/apt29-a-timeline-of-malicious-activity/2480. \[Accessed 18 April 2021\].

  \[9\]    FireEye, Inc., \"HAMMERTOSS: Stealthy Tactics Define a Russion Cyber Threat Group,\" July 2015. \[Online\]. Available:
           https://www2.fireeye.com/rs/848-DID-242/images/rpt-apt29-hammertoss.pdf?mkt_tok=ODQ4LURJRC0yNDIAAAF8Ztrl1dKsM0psfNu1D-TB80-Z06Cqa4CDzyYEmtmqR6RsQ-ZTqqsqP55YiPTIW6O8KDdKmE_LIQYw4-Qu2EHXI4jNQWsorZ0vfo4f_5ibZzZ89QU.
           \[Accessed 18 April 2021\].

  \[10\]   A. Jaquith and P. Roberts, \"Latest CISA Warning Hints At Worst Case Scenario In Russia Hack,\" 18 December 2020. \[Online\]. Available:
           https://www.qomplx.com/latest-cisa-warning-hints-at-worst-case-scenario-russia-hack/. \[Accessed 21 April 2021\].

  \[11\]   R. Hackett, \"FireEye Names New CEO After Months of Rumors,\" 6 May 2016. \[Online\]. Available: https://fortune.com/2016/05/06/fireeye-ceo-rumors/. \[Accessed 18 April 2021\].

  \[12\]   FireEye, Inc., \"Form 10-K,\" 31 December 2020. \[Online\]. Available: https://www.sec.gov/ix?doc=/Archives/edgar/data/1370880/000137088021000010/feye-20201231.htm. \[Accessed 18 April 2021\].

  \[13\]   K. Mandia, \"FireEye Shares Details of Recent Cyber Attack, Actions to Protect Community,\" 8 December 2020. \[Online\]. Available:
           https://www.fireeye.com/blog/products-and-services/2020/12/fireeye-shares-details-of-recent-cyber-attack-actions-to-protect-community.html. \[Accessed 18 April 2021\].

  \[14\]   J. Vijayan, \"SolarWinds Campaign Focuses Attention on \'Golden SAML\' Attack Vector,\" 12 December 2020. \[Online\]. Available:
           https://www.darkreading.com/attacks-breaches/solarwinds-campaign-focuses-attention-on-golden-saml-attack-vector/d/d-id/1339794. \[Accessed 18 April 2021\].

  \[15\]   K. Huang and S. Madnick, \"A Cyberattack Doesn't Have to Sink Your Stock Price,\" 14 August 2020. \[Online\]. Available: https://hbr.org/2020/08/a-cyberattack-doesnt-have-to-sink-your-stock-price. \[Accessed 19
           April 2021\].

  \[16\]   Depository Trust & Clearing Corporation , \"LARGE-SCALE CYBER-ATTACKS ON THE FINANCIAL SYSTEM,\" March 2018. \[Online\]. Available:
           https://www.dtcc.com/\~/media/Files/downloads/Thought-leadership/large-scale-cyber-attacks-on-the-financial-system.pdf?utm_source=perspective&utm_medium=forms&utm_campaign=thought_leadership. \[Accessed 19 April
           2021\].

  \[17\]   E. Simchi-Levi, \"The Most Important Concept in Supply Chain Management - Risk Pooling,\" \[Online\]. Available:
           https://www.supplychain247.com/article/the_most_important_concept_in_supply_chain_management\_-\_risk_pooling/ops_rules_management_consultants. \[Accessed 198 April 2021\].

  \[18\]   National Public Radio, \"GOP Senators Spend Independence Day In Moscow,\" 6 July 2018. \[Online\]. Available: https://www.npr.org/2018/07/06/626664156/gop-senators-spend-july-4-in-moscow. \[Accessed 19 April
           2021\].

  \[19\]   M. McFaul, \"Putin, Putinism, and the Domestic Determinants of Russian Foreign Policy,\" *International Security,* pp. 95-139, 1 October 2020.

  \[20\]   C. Lotrionte, \"State Sovereignty and Self-Defense in Cyberspace: A Normative Framework for Balancing Legal Rights,\" *Emory International Law Review,* vol. 12, no. 2, 2012.

  \[21\]   Positive Technologies Security, \"Hack at all cost: putting a price on APT attacks,\" 1 August 2019. \[Online\]. Available:
           https://www.ptsecurity.com/ww-en/analytics/advanced-persistent-threat-apt-attack-cost-report/. \[Accessed 19 April 2021\].

  \[22\]   R. Maness, \"Death by a Thousand Cuts: Is Russia Winning the Information War with the West?,\" 9 August 2018. \[Online\]. Available:
           https://www.researchgate.net/publication/326926354_Death_by_a_Thousand_Cuts_Is_Russia_Winning_the_Information_War_with_the_West. \[Accessed 19 April 2021\].

  \[23\]   C. Bronk and E. Tikk-Ringas, \"The Cyber Attack on Saudi Aramco,\" *Global Politics and Strategy,* vol. 55, no. 2, 2013.

  \[24\]   A.-M. Taliharm, \"Towards Cyberpeace: Managing Cyberwar Through International Cooperation,\" \[Online\]. Available:
           https://www.un.org/en/chronicle/article/towards-cyberpeace-managing-cyberwar-through-international-cooperation. \[Accessed 19 April 2021\].

  \[25\]   International Telecommunication Union, \"UNDERSTANDING CYBERCRIME:PHENOMENA, CHALLENGES AND LEGAL RESPONSE,\" 2012. \[Online\]. Available:
           https://www.itu.int/ITU-D/cyb/cybersecurity/docs/Cybercrime%20legislation%20EV6.pdf. \[Accessed 19 April 2021\].

  \[26\]   J. M. Garon, \"Cyber-World War III,\" *Journal of Law & Cyber Warfare,* vol. 7, no. 1, pp. 1-60, 2018.

  \[27\]   C. Cimpanu, \"FireEye releases tool for auditing networks for techniques used by SolarWinds hackers,\" 19 January 2021. \[Online\]. Available:
           https://www.zdnet.com/article/fireeye-releases-tool-for-auditing-networks-for-techniques-used-by-solarwinds-hackers/. \[Accessed 18 April 2021\].

  \[28\]   Cyentia Institute, \"Information Risk Insights Study,\" Advisen, 2020.

  \[29\]   H. Milner, \"The Assumption of Anarchy in International Relations Theory: A Critique,\" *Review of International Studies ,* vol. 17, no. 1, pp. 67-85, 1991.

  \[30\]   J. Mearsheimer, \"Chapter Two, Anarchy and the Struggle for Power,\" in *The tragedy of great power politics*, New York, Norton & Company, 2001.
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
