  # Unintended Disclosure: LLMs and Inferential Attacks

	Generative text retrieval systems require readily-available and reliable training data. As government and sensitive industries begin to deploy generative-based computing as part of their standard operating procedures, the risk posed by training data leakage should be examined. This paper examines how Large Language Models (LLMs) can be exploited by bad actors. By reviewing the generative responses created by a system, outside actors can reverse engineer and gain an understanding of the training data used for the LLM. As governments and sensitive industries begin to provide the training data to LLMs, the risk that bad actors could compromise sensitive or classified information is increased. 

LLMs are currently revolutionizing computation systems; given the right training material, LLMs can provide a road map to manufacture bombs, teach physics, or run an investment portfolio. At their simplest, LLMs are “next-word” prediction algorithms. Semantic-based LLM models formalize this context by mapping text strings to “N-dimensional” vectors. In broad strokes, these models “generate” answers or the *n+1* response by comparing cosine similarities of a query-mapped vector to its trained vector space. The original mapping is modeled as an “embedding” that represents a transformation function applied to a unique sequence of strings. (Ayrey and NCC Group PLC).

	As much of the world is embracing LLM text generation, it is natural that the world’s governments follow suit. In the United States, virtually all Federal agencies are experimenting with LLMs, with much of the emphasis placed on “semantic search” functions to quickly generate (or “retrieve”) output. 

	The usefulness of the responses retrieved by semantic searches largely depends on the training data used to generate the ‘embedding” space. LLMs whose training data is limited will provide similarly limited results. For instance, an LLM trained only to include publicly-available data will necessarily exclude classified information, which limits its usefulness to legitimate government actors. However, attackers are able to exploit this principle to perform inference attacks that leak training data. Given this risk, LLMs designed for government use, especially within agencies tasked with managing national security, should be carefully examined to guard against the possibility of training data leakage. This risk is not theoretical, as inference attacks against semantic-based LLMs have already proven effective. Recent research studies have demonstrated the simplicity and effectiveness of compromising training data; the risk is exponentially greater when classified information can be targeted. (Ayrey and NCC Group PLC).

	Inferential attacks against generative LLMs generally have the following taxonomy: 

“\[A\] model is prompted in a manner that causes it to generate text containing verbatim portions of the data it was trained on. Many outputs are generated, and then the outputs are ranked on the basis of various factors such as entropy, perplexity and the responses of other, similar models, to determine which generated sequences are most likely to contain verbatim training data.”

In an inferential attack, the attacker’s goal is to determine whether an arbitrary data record was part of the model’s training dataset or not. An attacker can test a particular approach using well-known metrics for accuracy: precision (what fraction of records inferred as members are indeed members of the training dataset) and recall (what fraction of the training dataset’s members are correctly inferred as members by the attacker). (Shokri et al. 4-8).

	A popular method for constructing an LLM-targeted inferential attack is to extrapolate model training data by passing query responses to an “attack” model. (Ayrey and NCC Group PLC). The attack model is trained using “shadow” models with known “ground-truth” training data and intended to behave similar to the target model. Research on successful attacks has also shown that a collection of shadow models, when “grouped” or “orchestrated”, monotonically increases attack model accuracy. To carry out the attack, the result of a target model is passed to the shadow model whose task resolves to a binary classification problem: result in training set or result out of training set. (Ayrey and NCC Group PLC). The thrust of the attack is to exploit an assumption that the target model’s “generated” output will cohere to statistically different/significant distributions where the return value was part of such model’s training set. (Shokri et al. 6\)

	When examining this scenario, the study *Membership Inference Attacks Against Machine Learning Models* has found that even where “shadow” models are trained using “synthetic” data and “black-boxed” against the target, precision scores were measured at 0.795 (for marginal-based synthetic data) and 0.895 (for model-based synthetic data). (Shokri et al. 14 ).If the shadow models are trained using known “real” data, precision increases to 0.935. Of particular note is that accuracy monotonically increases with the number of output classes and is stochastic to model “overfitting”. (Shokri et al. 13-14). In the words of the study’s authors (Shokri et al. 12): 

“Success of membership inference is directly related to the (1) generalizability of the target model and (2) diversity of its training data. If the model overfits and does not generalize well to inputs beyond its training data, or if the training data is not representative, the model leaks information about its training inputs.”

	Mitigation strategies are also currently limited. Possible strategies include: restricting model prediction vectors to a subset *k \< N* classes, increasing entropy of prediction vectors, and/or using regularization techniques. Even in these cases however, the “shadow” models can instead be trained to identify “mislabeling” and use it to extrapolate “true” training data. 

	The results above are shown for inference attack, but exploits have also been conducted and proved using model inversion, model extraction, data poisoning, model stealing, inference by covariance, and many others (including traditional hacking techniques). (Ayrey and NCC Group PLC). 

While these exploits have received little public attention in the United States, AI and LLM technology have entered the collective consciousness as well as our legal framework. The definition of Artificial Intelligence itself is codified in Federal law under Section 238(g) of the National Defense Authorization Act. (United States Congress). The use of AI in the Federal government has recently been outlined by way of Presidential Executive Order. (Executive Office of the President). Expansion and integration of generative LLM technology has also become a stated goal of the General Services Administration (which also publishes an AI Community of Practice). To encourage AI adoption, the GSA has offered cash awards for ”Improving Federal Government Services Through the Use of LLMs” (*See e.g., the “Applied AI Challenge: Large Language Models (LLMs)” challenge posted by the General Services Administration* *and awarded on September 14, 2023*). (General Services Administration’s AI Community of Practice). The government isn’t alone in its embrace of AI, as recent studies have found that 99% of Fortune 500 companies have implemented and/or relied on some AI-based solution. (Armstrong Teasdale).

As outlined above, AI and LLM have been rapidly adopted and embraced. However, given the potential harm from exposure of sensitive or classified material, the axiomatic “move fast and break things” approach of technological implementation becomes particularly problematic. Government agencies and sensitive industries should proceed with caution until improved safeguards have been vetted and the potential for training data leaks are reduced. 

	To be clear, this type of caution does not require a wholesale pause in the adoption of this technology or a fear of its implementation. Instead, the gaps and risks presented here should prompt implementers, procurers, and users of generative LLMs to demand more rigorous validation, testing, and understanding of LLM solutions. 

Works Cited  
Armstrong Teasdale. “AI in the Workplace: Is Your Enterprise Intelligent About Artificial Intelligence?” *Armstrong Teasdale LLP*, 4 May 2023, https://www.armstrongteasdale.com/thought-leadership/ai-in-the-workplace-is-your-enterprise-intelligent-about-artificial-intelligence/. Accessed 12 November 2023\.  
Ayrey, Dylan, and NCC Group PLC. “Practical Attacks on Machine Learning Systems.” *NCC Group Research Blog*, 07 2022, https://research.nccgroup.com/wp-content/uploads/2022/07/practical-attacks-on-ml.pdf. Accessed 12 November 2023\.  
Executive Office of the President. “Promoting the Use of Trustworthy Artificial Intelligence in the Federal Government.” *Federal Register*, Federal Register, 8 December 2020, https://www.federalregister.gov/d/2020-27065. Accessed 12 November 2023\.  
General Services Administration’s AI Community of Practice. “Challenge.Gov.” *Challenge.Gov*, 30 06 2023, https://portal.challenge.gov/public/previews/challenges?challenge=fc145291-15a7-4276-932f-d1a983a178d8\&print=true. Accessed 12 November 2023\.  
Shokri, Reza, et al. “Membership Inference Attacks Against Machine Learning Models.” *2017 IEEE Symposium on Security and Privacy*, vol. 41, no. SP, 2017, pp. 3-18, https://ieeexplore.ieee.org/abstract/document/7958568/references. Accessed 12 11 2023\.  
United States Congress. “Public Law 115 \- 232 \- John S. McCain National Defense Authorization Act for Fiscal Year 2019 \- Content Details \-.” *GovInfo*, 13 08 2019, https://www.govinfo.gov/app/details/PLAW-115publ232. Accessed 12 November 2023\.  