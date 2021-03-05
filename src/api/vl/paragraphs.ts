import { CaseTopic, TemplateParagraph, Advice, Paragraph } from '@monaco-digital/vl-types/lib/main'
import { getAllParagraphs } from './paragraph'
import { nanoid } from 'nanoid'
import _ from 'lodash'
import store from '../../data/store'

interface Rankable {
	topicsOneOf?: string[]
	topicsAllOf?: string[]
	topicsNoneOf?: string[]
}

const getSuggestedAdviceParagraphs = async (selectedTopics: CaseTopic[]): Promise<Advice[]> => {
	const selectedTopicsAndParents = includeParentTopics(selectedTopics)
	const allAdvice = rawAdviceParas.map(rap => {
		return {
			id: rap.id,
			text: rap.text,
			topicsOneOf: _.compact(rap.topicsOneOf.split(',').map(s => s.trim())),
			topicsAllOf: _.compact(rap.topicsAllOf.split(',').map(s => s.trim())),
			topicsNoneOf: _.compact(rap.topicsNoneOf.split(',').map(s => s.trim())),
		} as Advice
	})
	const filtered = filterAdviceParagraphs(allAdvice, selectedTopicsAndParents)
	return filtered
}

const getSuggestedParagraphs = async (selectedTopics: CaseTopic[]): Promise<TemplateParagraph[]> => {
	const paragraphs = await getAllParagraphs()
	const selectedTopicsAndParents = includeParentTopics(selectedTopics)

	const filtered = filterSuggestedParagraphs(paragraphs, selectedTopicsAndParents)

	return filtered
}

const filterAdviceParagraphs = (allParagraphs: Advice[], selectedTopics: CaseTopic[]): Advice[] => {
	if (!selectedTopics || selectedTopics.length === 0) {
		return allParagraphs
	}

	const selectedTopicIds = selectedTopics.map(topic => topic.id)
	const scoredAndFilteredParas = []
	allParagraphs.forEach(adviceParagraph => {
		//score to rank how relevant the paragraph is
		const allOf = matchesAllOf(adviceParagraph, selectedTopicIds)
		const oneOf = matchesOneOf(adviceParagraph, selectedTopicIds)
		const noneOf = matchesNoneOf(adviceParagraph, selectedTopicIds)
		let score = allOf && oneOf && noneOf ? 1 : 0

		if (score > 0) {
			scoredAndFilteredParas.push({
				paragraph: adviceParagraph,
				score,
			})
		}
	})

	return scoredAndFilteredParas.map(p => p.paragraph)
}

const filterSuggestedParagraphs = (
	allParagraphs: TemplateParagraph[],
	selectedTopics: CaseTopic[]
): TemplateParagraph[] => {
	if (!selectedTopics || selectedTopics.length === 0) {
		return allParagraphs
	}

	const selectedTopicIds = selectedTopics.map(topic => topic.id)
	const scoredAndFilteredParas = []
	allParagraphs.forEach(templateParagraph => {
		//score to rank how relevant the paragraph is
		const allOf = matchesAllOf(templateParagraph.paragraph, selectedTopicIds)
		const oneOf = matchesOneOf(templateParagraph.paragraph, selectedTopicIds)
		const noneOf = matchesNoneOf(templateParagraph.paragraph, selectedTopicIds)
		let score = allOf && oneOf && noneOf ? 1 : 0

		if (score > 0) {
			scoredAndFilteredParas.push({
				paragraph: templateParagraph,
				score,
			})
		}
	})

	return scoredAndFilteredParas.map(p => p.paragraph)
}

const includeParentTopics = (selectedTopics: CaseTopic[]) => {
	const state = store.getState()
	const allTopics = state.topics.all
	const updatedSelectedTopics = []
	selectedTopics.forEach(selectedTopic => {
		if (selectedTopic.parentTopics?.length > 0) {
			selectedTopic.parentTopics.forEach(parentTopic => {
				updatedSelectedTopics.push(allTopics.find(topic => topic.id === parentTopic))
			})
		}
		updatedSelectedTopics.push(selectedTopic)
	})
	return _.compact(updatedSelectedTopics)
}

const matchesAllOf = (paragraph: Rankable, selectedTopicIds) => {
	let matchCount = 0
	if (paragraph.topicsAllOf.length === 0) return true
	paragraph.topicsAllOf.forEach(topicId => {
		if (selectedTopicIds.includes(topicId)) {
			matchCount++
		}
	})
	return matchCount === paragraph.topicsAllOf.length
}

const matchesOneOf = (paragraph: Rankable, selectedTopicIds) => {
	let matchCount = 0
	if (paragraph.topicsOneOf.length === 0) return true
	paragraph.topicsOneOf.forEach(topicId => {
		if (selectedTopicIds.includes(topicId)) {
			matchCount++
		}
	})
	return matchCount > 0
}

const matchesNoneOf = (paragraph: Rankable, selectedTopicIds) => {
	let matchCount = 0
	paragraph.topicsNoneOf.forEach(topicId => {
		if (selectedTopicIds.includes(topicId)) {
			matchCount++
		}
	})
	return matchCount === 0
}

export { getSuggestedParagraphs, getSuggestedAdviceParagraphs }

const rawAdviceParas = [
	{
		id: nanoid(),
		text: `Advice\n\nVirtual Lawyer will advise whether or not you have a potential case against your employer, based on the information you’ve given us. Virtual Lawyer cannot advise on the strength of your case, but it will give you some pointers so that you can make an educated guess.\n\nIf you do have a case, it’s important to gather evidence as your employer will likely want to deny wrongdoing. The stronger your case, the more likely the employer is to settle it with you (although there are no guarantees and different employers act differently). This is why we refer to having a claim throughout the advice - it’s always in the shadow of your negotiations with your employer.`,
		topicsOneOf: '',
		topicsAllOf: '',
		topicsNoneOf: '',
	},
	{
		id: nanoid(),
		text: `Time limits\n\nThis is very important. You should keep on top of the time limit for your case, even if you don’t intend to bring a claim at an employment tribunal. It’s essential for your bargaining power - once you’ve lost your right to issue a claim, the employer has no incentive to settle the case with you.\n\nTime limits for employment claims are short - three months minus one day from the last act complained of. In a claim for unfair dismissal or constructive dismissal, the time limit will run from your last day of employment. For other claims such as discrimination or whistleblowing, the time limit will normally run from the date of the employer’s alleged wrongdoing. When the treatment is ongoing, it will be the date of the last act. Time limits can occasionally be extended - however, we’d urge that you bring your claim promptly as you don’t want a dispute in the tribunal about this. More information on time limits: https://www.monacosolicitors.co.uk/tribunals/time-limits/.\n\nIf it’s getting close to the time limit expiring, you should contact Advisory Conciliation and Arbitration Service (Acas) for early conciliation, which is a compulsory step before issuing a claim and it will give you a bit more time. For more information see: https://www.acas.org.uk/making-a-claim-to-an-employment-tribunal.`,
		topicsOneOf: '',
		topicsAllOf: '',
		topicsNoneOf: '',
	},
	{
		id: nanoid(),
		text:
			"Consider submitting a grievance\n\nWhether your overall objective is to stay in your job or leave with a settlement package, it might be a good idea to submit a grievance first. Most employers will expect you to attempt to resolve matters informally at first but this might not be appropriate in all the circumstances. Making a decision about lodging a formal grievance is a difficult one – it formalises your complaint so you need to be ready to stand by your case. But the positive is that it requires your employer to take formal action to resolve matters.\n\nBefore submitting a grievance, check the Company’s grievance policy and refer to the Acas Code of Practice. Hopefully, you might be able to find a way of solving the problems without formal steps. If not, then your grievance should set out clearly, chronologically and concisely what your complaint is, identify the staff involved and the dates that incidents happened. Keep relevant emails and other documents to refer to and print them off – you may need this evidence in the future. Virtual Lawyer will help you formulate a sensible grievance letter. \n\nDo keep in mind that these procedures can go on for months, particularly if the employer wishes to drag their feet. If your grievance is dismissed, you'll have to be prepared to submit an appeal quickly (as most employers give you five working days for this). On the other hand, it might take just days if there is an impetus to start another procedure, for example, a disciplinary. If you are signed off from work you may not be well enough to attend a meeting and this may need to be held in abeyance until you are better. It is worth reminding yourself of the procedure and the timetable that is stipulated.\n\nIf your objective is to leave your job with a settlement package, a grievance process will often go hand in hand with a ‘without prejudice’ letter – but it is important to time this carefully. Giving the employer some time to contemplate the extent of the grievance, and to start the interviews of relevant staff, might demonstrate how long the whole process is going to take and make a quick settlement seem more appealing. Once this realisation has sunk in might be a good time to submit a 'without prejudice' letter. Although, equally, it can follow that an employer will feel vindictive and also have a closed mind if a grievance letter has been submitted and it can be better to make a proposal promptly.\n\nThe best tactic for your situation will depend upon a number of factors including the size and administrative resources of the employer and the personalities and attitude to money of key decision makers.",
		topicsOneOf: '',
		topicsAllOf: 'GNo',
		topicsNoneOf: '',
	},
	{
		id: nanoid(),
		text:
			"If you’ve already submitted a grievance\n\nMake sure you are prepared. When you read an employer’s grievance procedure it may look like the process will only take a few weeks but the reality is often rather different. These procedures can drag on for months, if the employer wishes to drag their feet or just take a few days if there is an impetus to start another procedure, for example, a disciplinary. If you are signed off from work you may not be well enough to attend a meeting and this may need to be held in abeyance until you are better. It is worth reminding yourself of the procedure and the timetable that is stipulated.\n\nBefore submitting a grievance, check the company’s grievance policy and refer to the Acas Code of Practice. Hopefully, you might be able to find a way of solving the problems without formal steps. If not, then your grievance should set out clearly, chronologically and concisely your complaint and identify the staff involved and the dates that incidents happened. Keep relevant emails and other documents to refer to and print them off – you may need this evidence in the future.\n\nWhat's your overall objective? If it's to leave your job with a settlement package, a grievance process will often go hand in hand with a ‘without prejudice’ letter – but it is important to time this carefully. Giving the employer some time to contemplate the extent of the grievance, and to start the interviews of relevant staff, might demonstrate how long the whole process is going to take and make a quick settlement seem more appealing. Once this realisation has sunk in might be a good time to submit a 'without prejudice' letter. Although, equally, it can follow that an employer will feel vindictive and also have a closed mind if a grievance letter has been submitted and it can be better to make a proposal promptly.\n\nThe best tactic for your situation will depend upon a number of factors including the size and administrative resources of the employer and the personalities and attitude to money of key decision makers.\n\nIf your grievance has been dismissed\n\nThere are no statistics on this, but in our experience the vast majority of grievances will be dismissed by the employer. This is not to say that the basis of the grievance was not credible or justified. It usually shows the protective position that employers adopt as a means of protecting or backing up managers and as a way of trying to avoid liability. Don’t lose heart if your grievance has been knocked back: if your employer takes adverse action because you have complained there can be a further complaint for retaliation or victimisation (if your grievance was about whistleblowing or discrimination).\n\nA grievance is generally the first of many formal steps you can take, and your employer may be keen to settle with you if it looks like you are planning to start tribunal proceedings.\nIf your employer has not found in your favour (they rarely do), you should appeal. You need to make this decision very quickly as most employers will provide you with five working days only - that’s very little time, particularly when you haven’t had the notes of the grievance meeting yet and you have plenty of day-to-day work stacking up. If you are short of time, write them a letter saying that you plan to appeal and ask for additional time, 14 days or until they have supplied you with any further information you require.\n\nIf the outcome of your grievance is being appealed\n\nYou need to review the basis of your appeal. The employer will say that the appeal is not a rehearing of the previous grievance. However, sometimes the grievance process is so flawed that a rehearing is necessary as they have failed to consider the main substance of the grievance.\n\nGenerally speaking, your line of attack is to identify the facts which the grievance manager has failed to consider, or respond to in their communications. This might be found in evidence they have presented, such as any communications with independent witnesses, consideration of irrelevant facts or reaching conclusions that were not permissible or perverse in the circumstances. A further line of attack may be to say that they have adopted a biased and partisan approach to the grievance, that could be because they are friends with the person you have complained about, or share an office with them for example.\n\nAround the time of an appeal hearing is often a good time to have a ‘without prejudice’ discussion. This is because a more senior manager will then be required to spend time dealing with the issue.\n\nIf your grievance was dismissed and then upheld on appeal\n\nWell done! If a grievance is upheld it means that the employer accepts your grievance and does not dispute it. It is rare for an employer to find in favour of an employee in a grievance.\n\nBut beware, as this might have been strategic and the employer may have another trick up their sleeve. That said, if your employer has upheld your grievance then there is a good prospect that you will be able to negotiate favourable terms – either to leave the employment (if that is what you want), or to remedy the cause of your grievance.\nIf you want to leave, then it will be worth reinforcing your negotiation strategy and either write a ‘without prejudice’ letter or have a ‘without prejudice’ meeting to discuss a possible settlement.\n\nIf your grievance was dismissed and then partially upheld on appeal\n\nYour employer is likely to have found in your favour on a small procedural point but the main substance of your grievance has been rejected. This is often a ploy to demonstrate a fair approach taken to the grievance process and suggest that they have been fair minded and considered all the points in an independent review.\nEven with this outcome, there is still a good chance that you have room to negotiate a settlement agreement.\n\nWhat was the approximate date of your grievance?\n\nThe date of your grievance will be important for the calculation of time limits in relation to claims brought to the employment tribunal. If you have made an official grievance at work, the 3 month time limit would start on the date of the incident to which you are making a grievance about – meaning you may already have less than 3 months left. It could be argued that failures during the grievance process could be regarded as a continuing act of discrimination against you. Therefore it is important to record every communication and event after you lodge your grievance.",
		topicsOneOf: '',
		topicsAllOf: 'G',
		topicsNoneOf: '',
	},
	{
		id: nanoid(),
		text:
			'You have been employed for less than two years. \n\nYou have limited employment rights at this point, which means you cannot bring an unfair dismissal claim. In some circumstances, you could bring a wrongful dismissal claim, but that normally entitles you to notice pay only. The good news is you don’t need two years’ service to bring some other claims, such as for discrimination, whistleblowing, certain health & safety breaches or money owed to you.',
		topicsOneOf: '',
		topicsAllOf: '2y,E',
		topicsNoneOf: '',
	},
	{
		id: nanoid(),
		text:
			'You were employed for less than two years. \n\nYou have limited employment rights at this point, which means you cannot bring an unfair dismissal claim. In some circumstances, you could bring a wrongful dismissal claim, but that normally entitles you to notice pay only. The good news is you don’t need two years’ service to bring some other claims, such as for discrimination, whistleblowing, certain health & safety breaches or money owed to you.',
		topicsOneOf: 'T,Rd',
		topicsAllOf: '2y',
		topicsNoneOf: '',
	},
	{
		id: nanoid(),
		text:
			'You have been employed for over two years.\n\nYou have full employment rights after two years, including unfair dismissal rights. That means that the employer has to give a fair reason for dismissal.',
		topicsOneOf: '',
		topicsAllOf: 'E',
		topicsNoneOf: '2y',
	},
	{
		id: nanoid(),
		text:
			'You were employed for over two years.\n\nYou have full employment rights after two years, including unfair dismissal rights. That means that the employer has to give a fair reason for dismissal.',
		topicsOneOf: 'T,Rd',
		topicsAllOf: '',
		topicsNoneOf: '2y',
	},
	{
		id: nanoid(),
		text:
			"You resigned.\n\nIf you no longer work for your employer, this can be a disadvantage. You're no longer the thorn in their side which they are trying to get rid of, so there is less motivation for them to reach a financial settlement with you. But this may still be possible if you have a strong claim. It may be possible for you to argue constructive dismissal, i.e. that your employer's actions were so bad, either as a one-off incident or cumulatively, that you were left with no choice but to resign.\n\nIf you already have another job, your financial loss is a lot less than if you were unemployed. This would reduce your settlement amount accordingly.",
		topicsOneOf: '',
		topicsAllOf: 'Rd',
		topicsNoneOf: '',
	},
	{
		id: nanoid(),
		text:
			"You're still employed.\n\nThis is good news. Regardless of the issue that you have with your employer, it's normally better to stay in your job than resign. If you remain a thorn in their side, your employer will be more motivated to reach a financial settlement with you. As part of a negotiation, you will consider your potential financial losses and use these to try and get your employer to increase the settlement figure. \n\nIf your treatment has been really bad, it may be possible to argue that the employer is forcing you to resign and if you did resign you would bring a constructive unfair dismissal claim. That's how you'd put it in the letter to them.\n\nIf you have a case for constructive dismissal, as long as you have not left it too long to take action, remaining in employment gives you the best negotiating position. Having said that however, there comes a point eventually at which you do need to resign in order to protect your negotiating position. That point is probably once you’ve exhausted all the internal grievance processes and appeals. If you continue to stay on in your role after these procedures have been adhered to, you would legally be taken to have ‘accepted’ your employer’s misconduct and effectively forgiven them.\n\nThis means you wouldn’t be able to resign a few months later (say when you find a new job) and claim for a constructive dismissal settlement, because the trigger for your resignation would be getting a new job rather than the original misconduct.",
		topicsOneOf: '',
		topicsAllOf: 'E',
		topicsNoneOf: '2y',
	},
	{
		id: nanoid(),
		text:
			"You're still employed.\n\nThis is good news. Regardless of the issue that you have with your employer, it's normally better to stay in your job than resign. If you remain a thorn in their side, your employer will be more motivated to reach a financial settlement with you. As part of a negotiation, you will consider your potential financial losses and use these to try and get your employer to increase the settlement figure. \n\nIf your treatment has been really bad, it may be possible to argue that the employer is forcing you to resign and if you did resign you would bring a constructive dismissal claim. As you've been employed for less than two years, a successful wrongful dismissal claim would normally result in notice pay only. You could get more compensation if you have a discrimination or whistleblowing claim, or suffered mistreatment due to action you took to protect your health and safety.",
		topicsOneOf: '',
		topicsAllOf: 'E,2y',
		topicsNoneOf: '',
	},
	{
		id: nanoid(),
		text:
			"We're sorry to hear you've been dismissed.\n\nAs you were employed for less than two years, you don't have unfair dismissal rights and so the employer doesn’t need a particularly good reason for dismissing you. However, the dismissal will be unlawful if it’s discriminatory, motivated by whistleblowing or is in retaliation for taking protected action in respect of health & safety issues (e.g. refusing to attend a workplace that isn’t coronavirus secure). \n\nIf you already have another job, your financial loss is a lot less than if you were unemployed. This would reduce your settlement amount accordingly.",
		topicsOneOf: '',
		topicsAllOf: 'T,2y',
		topicsNoneOf: '',
	},
	{
		id: nanoid(),
		text:
			'You told us the reason given for your dismissal was redundancy. \n\nUnfortunately, the employer doesn’t need to follow particularly rigorous procedures in order to make you redundant, as you’ve been employed for less than two years. This means that you don’t have a claim, unless the real reason for your redundancy was discrimination, whistleblowing or taking action to protect your health and safety.',
		topicsOneOf: '',
		topicsAllOf: 'T,2y,R',
		topicsNoneOf: '',
	},
	{
		id: nanoid(),
		text:
			'You told us the reason given for your dismissal was misconduct. \n\nAs you were employed for less than two years, you can’t bring an unfair dismissal claim. However, in certain circumstances you may bring a wrongful dismissal claim, for example if the accusation against you is completely made up. Gross misconduct dismissals are usually with immediate effect, but a successful wrongful dismissal claim will result in your contractual notice pay being awarded. You won’t normally get more than that - remember that the employer can still dismiss you without a particularly good reason if you’ve been employed for less than two years. However, if you were in fact dismissed for discriminatory reasons or because of your whistleblowing, the dismissal will be unlawful no matter how long you’ve been employed for.',
		topicsOneOf: '',
		topicsAllOf: 'T,2y,Mt',
		topicsNoneOf: '',
	},
	{
		id: nanoid(),
		text:
			'You told us the reason given for your dismissal was performance. \n\nAs you were employed for less than two years, the employer doesn’t need a particularly strong reason for dismissing you and thus doesn’t have to go through formal performance management. However, the dismissal may be unlawful if it’s due to matters arising from your disability, discriminatory for other reasons or is because of your whistleblowing.',
		topicsOneOf: '',
		topicsAllOf: 'T,2y,P',
		topicsNoneOf: '',
	},
	{
		id: nanoid(),
		text:
			"You told us the reason given for your dismissal was sickness absence. \n\nAs you were employed for less than two years, the employer doesn’t need a particularly strong reason for dismissing you. However, the dismissal may be unlawful if the sickness absence related to your disability (defined as a physical or mental long-term condition that has a substantial effect on day-to-day activities). But note that the employer needs to be aware of your disability (either you disclosed it or they found out by other means), otherwise there is no way for them to address it. Chances are, they are aware if you provided relevant sick notes and/or explanations. Once the employer has knowledge of your disability, they have a duty to consider making reasonable adjustments for you. The employer must not treat you unfavourably because of something arising from your disability. If that's been the case, you may have a disability discrimination claim. You have these rights even if you’ve been employed for less than two years.",
		topicsOneOf: '',
		topicsAllOf: 'T,2y,S',
		topicsNoneOf: '',
	},
	{
		id: nanoid(),
		text:
			'You told us you were given no reason for your dismissal. \n\nAs you were employed for less than two years, the employer doesn’t need a reason to dismiss you. However, the dismissal will be unlawful if it was in fact for a discriminatory reason, because of your whistleblowing or taking action to protect your health and safety.',
		topicsOneOf: '',
		topicsAllOf: 'T,2y,NRD',
		topicsNoneOf: '',
	},
	{
		id: nanoid(),
		text:
			'You told us the reason given for your dismissal was: [x]. \n\nAs you were employed for less than two years, the employer doesn’t need a particularly strong reason to dismiss you. However, the dismissal will be unlawful if it was in fact for a discriminatory reason, because of your whistleblowing or taking action to protect your health and safety.',
		topicsOneOf: '',
		topicsAllOf: 'T,2y,ORD',
		topicsNoneOf: '',
	},
	{
		id: nanoid(),
		text:
			"We're sorry to hear you've been dismissed.\n\nAs you were employed for more than two years, you have unfair dismissal rights. The reason for your dismissal needs to be one of the potentially fair reasons listed in the Employment Rights Act. Even if the reason given sounds fair but the right procedures weren't followed you may have an unfair dismissal claim. The dismissal will be unlawful if the real reason for it was discrimination, whistleblowing or taking protected action in respect of health & safety (e.g. refusing to attend a workplace that isn't coronavirus secure). \n\nIf you've been dismissed unfairly but already have another job, your financial losses are a lot less than if you were unemployed. This would reduce your settlement amount accordingly.",
		topicsOneOf: '',
		topicsAllOf: 'T',
		topicsNoneOf: '2y',
	},
	{
		id: nanoid(),
		text:
			"You told us the reason given for your dismissal was redundancy. \n\nThis means dismissal because the employer now needs fewer employees doing your type of work. The employer is within their rights to make redundancies, but two conditions have to be met for the redundancy to be lawful: \n\n(1) there has to be a genuine reduction in the amount of the type of work that you do (meaning they can’t use redundancy as a pretext to get rid of you, for example if you’d complained about something); \n\n(2) a fair redundancy process must be followed. That includes adequate warning and consultation, as well as fair selection criteria. The employer also has to try to keep you employed, for example by asking you to apply for an alternative position. \n\nDiscriminatory criteria or discrimination at any other stage of the process will make the redundancy problematic. Same applies if you've been selected because of your whistleblowing or taking action to protect your health and safety.\n\nAre you the only one made redundant or were there others as well?\n\nIf you're the only one made redundant, you may have better odds of negotiating a settlement. If your employer is a very small organisation then this may be fair enough. If it's a big organisation then you should ask questions about exactly why you were the one chosen.\n\nIf other people have been made redundant too, it can often be trickier to gather evidence that this was a sham redundancy or a deliberate attempt to get rid of you (for example for personal reasons). One common example of multiple redundancy is when a whole department is closing down or relocating. In this case there is often nothing you can do other than accept the redundancy money being offered.\n\nIf the process has been more selective than that, you should examine each stage in detail to ensure that the correct procedure has been followed. It might be a good idea to team up with the other employees being made redundant and consult an employment law solicitor if you feel that your employer has been unfair in their selection.\n\nWere you put in a pool for comparison with others?\n\nBeing put in a pool for comparison with others is a common way (but not the only way) for employers to carry out a redundancy exercise. Normally people put in a pool together are employees who have similar skill sets. It may be that you should be in a pool with more people, and that some people have been unfairly left out. Or it may be that you should not be in the pool at all. \n\nThere is a certain number of people who are to be made redundant, so those in a pool are compared to each other. The scoring is supposed to be objective, and those with the lowest scores are made redundant. Have a look at the criteria or ask for an explanation of the pool system and/or scoring system. Your employer should give you this as part of the consultation process. You could also try and get hold of peoples' job descriptions and compare them to ensure that it is a fairly constituted pool.\n\nWas alternative employment made available?\n\nAn employee being made redundant has the right to be offered alternative employment, or at least to apply for such jobs that might be suitable. If you don't get offered any alternative but you feel that there is space elsewhere in the company that you could legitimately work, this insight could be used in negotiations with your employer regarding a settlement.\n\nIf you're offered alternative employment, then even if you feel that you're being pushed out it can be a good idea to actually apply for the job. This will give your employer more motivation to reach a settlement, because it will take them more management time to interview you and refuse you the job (assuming that they just want you out and are going through the motions).\n\nAlternative employment should be ‘suitable’ though, so you can’t be criticised for not applying for jobs which are a significant paycut or use a totally different skill set. Having said that, it is legally acceptable for an employer to make you redundant because you cost too much, and then to replace you with someone else doing exactly the same job but on less money – so long as they offered it to you first.\n\nWere you offered statutory redundancy pay only?\n\nIf you've been made redundant unfairly, or potentially unfairly, and only offered the statutory redundancy pay, then you have nothing to lose by asking your employer for a settlement.\n\nOften if you actually ask, and do so in the correct way, many employers will ‘sweeten the deal' with a settlement figure. This is certainly worth doing, given that satutory redundanccy maximum is not exactly generous (£15,750 in 2019/20).\n\nVirtual Lawyer will certainly help to present your case, but solicitors who specialise in employee-side law are experts at leveraging up redundancy pay, so if you’re unsure of how to tackle this, just get in touch to request a consultation.\n\nWere you told there was an enhanced package available?\n\nOften there is an enhanced redundancy package available, but the amount on offer is not always clear. There is no harm in asking what the package would be. After all it makes sense for an employee to factor that into their thinking for a voluntary redundancy.\n\nSome generous employers will give people up to a month's wages for each year worked. This is probably the higher end of the scale. Others might give only a week's money for each year, but that might be uncapped, rather than the maximum limit set by the government for statutory redundancy (£15,750 in 2019/2020).\n\nThere also tends to be more flexibility with enhanced packages, so that different employees can negotiate different amounts even, depending on a number of factors including how much fuss you create and/or whether you are asking the right kind of searching questions.",
		topicsOneOf: '',
		topicsAllOf: 'T,R',
		topicsNoneOf: '2y',
	},
	{
		id: nanoid(),
		text:
			"You told us the reason given for your dismissal was misconduct. \n\nThis is a potentially fair reason for dismissal, so that an employee may be dismissed with immediate effect. Certain conditions have to be fulfilled though for such a dismissal to be fair. The allegation has to be serious enough to amount to misconduct, and there has to be a fair investigation and a chance for an employee to respond. If this hasn't been done, you may have an unfair dismissal claim. If you were in fact picked for discriminatory reasons or because of your whistleblowing, the dismissal will be unlawful.",
		topicsOneOf: '',
		topicsAllOf: 'T,Mt',
		topicsNoneOf: '2y',
	},
	{
		id: nanoid(),
		text:
			"You told us the reason given for your dismissal was poor performance. \n\nThis is a potentially fair reason for dismissal (also known as capability dismissal), but the employer needs to follow a fair procedure which means a chance for you to improve your performance and a performance improvement plan has to be implemented properly. If this hasn't been done, you may have an unfair dismissal claim. If the performance improvement plan was put in place due to matters arising from your disability, it will be disability discrimination and thus unlawful.",
		topicsOneOf: '',
		topicsAllOf: 'T,P',
		topicsNoneOf: '2y',
	},
	{
		id: nanoid(),
		text:
			"You told us the reason given for your dismissal was sickness absence.\n\nThe employer may be entitled to dismiss you if your absence level becomes unsustainable for them. The dismissal may be problematic if your sickness absence was related to your disability (defined as a physical or mental long-term condition that has a substantial effect on day-to-day activities). But note that the employer needs to be aware of your disability (either you disclosed it or they found out by other means), otherwise there is no way for them to address it. Chances are, they are aware if you provided relevant sick notes and/or explanations. Once the employer has knowledge of your disability, they have a duty to consider making reasonable adjustments for you. The employer must not treat you unfavourably because of something arising from your disability. If that's been the case, you may have a disabilty discrimination claim.",
		topicsOneOf: '',
		topicsAllOf: 'T,S',
		topicsNoneOf: '2y',
	},
	{
		id: nanoid(),
		text:
			'You told us that the employer gave no reason your dismissal.\n\nAs you were employed for more than two years, the employer needs a fair reason to dismiss you. Giving no reason makes the dismissal automatically unfair, meaning you have an unfair dismissal claim.',
		topicsOneOf: '',
		topicsAllOf: 'T,NRD',
		topicsNoneOf: '2y',
	},
	{
		id: nanoid(),
		text:
			"You told us that the reason given for your dismissal was [x].\n\nAs you were employed for more than two years, the employer needs a fair reason to dismiss you. As the reason given doesn't sounds like one of the potentially fair reasons in the Employment Rights Act 1996, you may have an unfair dismissal claim.",
		topicsOneOf: '',
		topicsAllOf: 'T,ORD',
		topicsNoneOf: '2y',
	},
	{
		id: nanoid(),
		text:
			'Bullying/harassment\n\nBullying is repeated behaviour intending to hurt someone either physically or emotionally. If you’ve experienced bullying in the workplace, whether from your boss or colleagues, you may have a claim for constructive unfair dismissal against your employer. Harassment is defined as unwanted treatment related to a protected characteristic, having the effect of violating one’s dignity or creating a hostile and degrading environment. Note that harassment is treated more seriously than bullying, as it’s a type of discrimination. It has to relate to one or more protected characteristics, which are: race or ethnicity; sex/gender; disability (defined as a long-term condition, either physical or mental, having a substantial effect on everyday life); age; religious or philosophical belief; pregnancy or maternity; sexual orientation; gender reassignment; and marital or civil partnership status). This list is exhaustive. So for example if you’re being called racist names, that could be a race harassment claim, but if it’s because you support the wrong football team, that’s bullying.',
		topicsOneOf: '',
		topicsAllOf: 'B',
		topicsNoneOf: '2y',
	},
	{
		id: nanoid(),
		text:
			'Bullying/harassment\n\nBullying is repeated behaviour intending to hurt someone either physically or emotionally. Bullying in the workplace can be extremely unpleasant, but you can’t normally bring a claim on this basis if you’ve been employed for less than two years. You may be able to bring a claim for harassment, as it’s a type of discrimination and thus treated more seriously than bullying. Harassment is defined as unwanted treatment related to a protected characteristic, having the effect of violating one’s dignity or creating a hostile and degrading environment. It has to relate to one or more protected characteristics, which are: race or ethnicity; sex/gender; disability (definted as a long-term condition, either physical or mental, having a substantial effect on everyday life); age; religious or philosophical belief; pregnancy or maternity; sexual orientation; gender reassignment; and marital or civil partnership status). This list is exhaustive. So for example if you’re being called racist names, that’s race harassment, and thus you can bring a discrimination claim whether or not you’ve been employed for two years. On the other hand, if you’re being called names because you support the wrong football team, that’s bullying and you can’t normally bring a claim based on that until you’ve been employed for two years.',
		topicsOneOf: '',
		topicsAllOf: 'B,2y',
		topicsNoneOf: '',
	},
	{
		id: nanoid(),
		text:
			'Risk of redundancy\n\nUnfortunately, the employer doesn’t need to follow particularly rigorous procedures in order to make you redundant, as you’ve been employed for less than two years. That means that you don’t have a claim based on this, unless there is an element of discrimination, whistleblowing or taking action to protect your health and safety.',
		topicsOneOf: '',
		topicsAllOf: 'RR,E,2y',
		topicsNoneOf: '',
	},
	{
		id: nanoid(),
		text:
			"Risk of redundancy\n\nRedundancy means dismissal because the employer now needs fewer employees doing your type of work. The employer is within their rights to make redundancies, but two conditions must be met for the redundancy to comply with the law:\n\n(1) there has to be a genuine reduction in the amount of the type of work that you do (meaning they can’t use redundancy as a pretext to get rid of you, for example if you’d complained about something);\n\n(2) a fair redundancy process must be followed. That includes adequate warning and consultation, as well as fair selection criteria. Your employer also has to try to keep you employed, for example by asking you to apply for an alternative position. \n\nDiscriminatory criteria or discrimination at any other stage of the process will make the redundancy problematic. Same applies to selecting you for redundancy because of your whistleblowing.\n\nAre you the only at risk or are there others as well?\n\nIf you're the only one being made redundant, you may have better odds of negotiating a settlement. If your employer is a very small organisation then this may be fair enough. If it's a big organisation then you should ask questions about exactly why you were the one chosen.\n\nIf other people are being made redundant too, it can often be trickier to gather evidence that this was a sham redundancy or a deliberate attempt to get rid of you (for example for personal reasons). One common example of multiple redundancy is when a whole department is closing down or relocating. In this case there is often nothing you can do other than accept the redundancy money being offered.\n\nIf the process has been more selective than that, you should examine each stage in detail to ensure that the correct procedure has been followed. It might be a good idea to team up with the other employees being made redundant and consult an employment law solicitor if you feel that your employer has been unfair in their selection.\n\nHave you been put in a pool for comparison with others?\n\nBeing put in a pool for comparison with others is a common way (but not the only way) for employers to carry out a redundancy exercise. Normally people put in a pool together are employees who have similar skill sets. It may be that you should be in a pool with more people, and that some people have been unfairly left out. Or it may be that you should not be in the pool at all. \n\nThere is a certain number of people who are to be made redundant, so those in a pool are compared to each other. The scoring is supposed to be objective, and those with the lowest scores are made redundant. Have a look at the criteria or ask for an explanation of the pool system and/or scoring system. Your employer should give you this as part of the consultation process. You could also try and get hold of peoples' job descriptions and compare them to ensure that it is a fairly constituted pool.\n\nHas alternative employment been made available?\n\nAn employee being made redundant has the right to be offered alternative employment, or at least to apply for such jobs that might be suitable. If you don't get offered any alternative but you feel that there is space elsewhere in the company that you could legitimately work, this insight could be used in negotiations with your employer regarding a settlement.\n\nIf you're offered alternative employment, then even if you feel that you're being pushed out it can be a good idea to actually apply for the job. This will give your employer more motivation to reach a settlement, because it will take them more management time to interview you and refuse you the job (assuming that they just want you out and are going through the motions).\n\nAlternative employment should be ‘suitable’ though, so you can’t be criticised for not applying for jobs which are a significant paycut or use a totally different skill set. Having said that, it is legally acceptable for an employer to make you redundant because you cost too much, and then to replace you with someone else doing exactly the same job but on less money – so long as they offered it to you first.\n\nHave you been offered statutory redundancy pay only?\n\nIf you're being made redundant unfairly, or potentially unfairly, and then you're offered only the statutory redundancy pay, then you have nothing to lose by asking your employer for a settlement.\n\nOften if you actually ask, and do so in the correct way, many employers will ‘sweeten the deal' with a settlement figure. This is certainly worth doing, given that satutory redundanccy maximum is not exactly generous (£15,750 in 2019/20).\n\nVirtual Lawyer will certainly help to present your case, but solicitors who specialise in employee-side law are experts at leveraging up redundancy pay, so if you’re unsure of how to tackle this, just get in touch to request a consultation.\n\nHave you been told there is an enhanced package available?\n\nOften there is an enhanced redundancy package available, but the amount on offer is not always clear. There is no harm in asking what the package would be. After all it makes sense for an employee to factor that into their thinking for a voluntary redundancy.\n\nSome generous employers will give people up to a month's wages for each year worked. This is probably the higher end of the scale. Others might give only a week's money for each year, but that might be uncapped, rather than the maximum limit set by the government for statutory redundancy (£15,750 in 2019/2020).\n\nThere also tends to be more flexibility with enhanced packages, so that different employees can negotiate different amounts even, depending on a number of factors including how much fuss you create and/or whether you are asking the right kind of searching questions.",
		topicsOneOf: '',
		topicsAllOf: 'RR,E',
		topicsNoneOf: '2y',
	},
	{
		id: nanoid(),
		text:
			"Performance issues\n\nThis basically means your employer isn't happy with your work. As you’ve been employed for less than two years, there isn’t much you can do about this one. The employer doesn’t need to follow a particularly rigorous procedure to dismiss you for performance or capability reasons. However, you may have a discrimination claim if these issues are related to your disability or if the employer is raising them for other discriminatory reasons. You might also have a valid claim if they're retaliating to your whistleblowing or your action to protect health and safety.",
		topicsOneOf: '',
		topicsAllOf: 'P,E,2y',
		topicsNoneOf: '',
	},
	{
		id: nanoid(),
		text:
			"Performance issues\n\nThe employer is entitled to raise performance issues (basically meaning they're not happy with your work), but they need to give you an opportunity to improve and follow a fair procedure. This normally involves properly implemented performance review, also known as performance management or a performance improvement plan (PIP). The latter is supposed to be a mechanism to assist an employee to improve their performance in order to meet defined objectives. In practice however, it's most commonly used by an employer to start a dismissal process.\n\nWhilst it can be difficult for an employee to contest performance issues, the good news is that many employers will prefer to negotiate an exit package swiftly rather than conduct protracted performance proceedings costing them in productivity and management time. Thus, the earlier you start negogiating the better. Keep in mind that you may have a discrimination claim if these performance issues are related to your disability, the employer is raising them for other discriminatory reasons or the PIP is implemented in a discriminatory way. You might also have a claim if the performance review is in retaliation to your whistleblowing or taking action to protect your health and safety.\n\nIf your performance review or performance improvement plan is ongoing\n\nWe're sorry to hear you're having to deal with this. Once the performance review or performance improvement plan (PIP) has started, you're likely to be invited to regular meetings. It might be that you have to spend more time preparing for these special meetings than doing your actual work, which is likely to add to the pressure you face and therefore it can affect your performance even more.\n\nTake a step back and look at matters objectively – does your manager wish to help you do your job better, or is this simply a process to push you out of the company? If it's the latter, it might be worth negotiating with them to see if you can reach agreeable terms to leave your employment with a settlement. \n\nVirtual Lawyer will help you formulate your argument. But it’s a good idea to get in touch with an employment law solicitor as soon as you can, as they will advise you on how to act, what actions to take, and what to keep a record of.\n\nIf you've passed your performance review or performance improvement plan\n\nWell done. Passing a performance improvement plan (PIP) will either show that there has been a vast improvement in your work or more likely, that there was little justification for starting the process in the first place. If your employer was attempting to use the PIP as a prelude to dismissing you, then they're going to be disappointed that this aggressive tactic was unsuccessful. At this point in proceedings it is often an excellent idea to begin discussions regarding a settlement. As you've already shown that you are ‘worthy’ of the position in passing the PIP, your employer should realise that they must offer you an attractive exit package. Virtual Lawyer will help you make the first move.\n\nWhat if you've failed your performance review or performance improvement plan?\n\nWe're sorry to hear this. The end of a PIP process in which you've shown to fail can be a tricky time to negotiate as an employer will feel that a fair dismissal is within their sights.\n\nHowever, you may have a very long list of reasons why you believe the performance review process was unfair, arbitrary and potentially at odds with your employers’ correct procedures. Equally, there could be other members of staff who have been treated more leniently than you without good reason. This is all likely to be useful ammunition for a ‘without prejudice’ discussion as you may be able to demonstrate your employers’ vulnerability.\n\nBut if you have enough evidence for an unfair dismissal claim, you can use this to negotiate a settlement agreement.\n\nYou can certainly use Virtual Lawyer to negotiate with your employer, but also consider seeking advice from a specialist solicitor who can help advise you on the best tactics to adopt.",
		topicsOneOf: '',
		topicsAllOf: 'P,E',
		topicsNoneOf: '2y',
	},
	{
		id: nanoid(),
		text:
			'Disciplinary proceedings\n\nAs you’ve been employed for less than 2 years, the employer can in principle dismiss you for no particular reason. However, if the disciplinary proceedings result in misconduct dismissal, you could in principle have a claim for wrongful dismissal (e.g. if the accusation against you is completely made up).\n\nIf you’re still employed but facing unfair or unjustified disciplinary proceedings (e.g. if the accusation is trivial, there is no evidence or the process is biased), you could have a claim for constructive wrongful dismissal. However, a successful claim won’t usually result in more than notice pay, as you’ve been employed for less than 2 years. \n\nIf the disciplinary proceedings against you are discriminatory, you may be entitled to bring a discrimination claim, which could result in more compensation even if employed for less than 2 years. You might also have a claim if the disciplinary proceedings are because of your whistleblowing or in retaliation to your action to protect health and safety.',
		topicsOneOf: '',
		topicsAllOf: 'Dy,E,2y',
		topicsNoneOf: '',
	},
	{
		id: nanoid(),
		text:
			"Disciplinary proceedings. \n\nThe employer is entitled to conduct disciplinary proceedings if there is a good reason. Disciplinary proceedings must not be unjustified or unfair (e.g. if the accusation is trivial, there is no evidence or the process is biased). If the disciplinary process is unjustified or unfair, you may have a potential constructive unfair dismissal claim. If the disciplinary proceedings are discriminatory, you may have a discrimination claim. You might also have a claim if they're because of your whistleblowing or in retaliation to your action to protect health and safety.",
		topicsOneOf: '',
		topicsAllOf: 'Dy,E',
		topicsNoneOf: '2y',
	},
	{
		id: nanoid(),
		text:
			"We're sorry to hear you’ve been suspended. \n\nWas the suspension necessary, considering all the circumstances? It must never be a ‘kneejerk’ reaction, however serious the allegation. The employer has to give a good reason for suspending you. If you’re facing an unjustified suspension, you could have a claim for constructive wrongful dismissal, if you were to resign. However, a successful claim won’t usually result in more than notice pay, as you’ve been employed for less than 2 years. If you’re suspended for discriminatory reasons, you may be entitled to bring a discrimination claim, which could result in more compensation even if you’ve been employed for less than 2 years. If you were suspended because you complained about something unlawful, you could have a whistleblowing claim, which could also result in a more substantial compensation. The same applies if the suspension because of your action to protect health and safety (e.g. refusing to attend an unsafe workplace).",
		topicsOneOf: '',
		topicsAllOf: 'Sn,E,2y',
		topicsNoneOf: '',
	},
	{
		id: nanoid(),
		text:
			"We're sorry to hear you’ve been suspended. \n\nWas the suspension necessary, considering all the circumstances? It must never be a ‘kneejerk’ reaction, however serious the allegation. The employer has to give a good reason for suspending you. If it wasn't necessary, you could potentially have a constructive unfair dismissal claim. You have an even stronger claim if your were suspended for discriminatory reasons, because of your whistleblowing or taking action to protect your health and safety (refusing to attend an unsafe workplace).",
		topicsOneOf: '',
		topicsAllOf: 'Sn,E',
		topicsNoneOf: '2y',
	},
	{
		id: nanoid(),
		text:
			"Sickness issues\n\nSorry to hear your employer didn’t deal or isn’t dealing with your sickness issues well. Unfortunately, you have limited employment rights if you’ve been employed for less than two years. If your sick pay has been underpaid, you may have an unlawful deductions of wages claim (which we address under 'Employer owes money').\n\nYou might have a disability discrimination claim if your sickness absence was related to your disability (which is defined as a physical or mental long-term condition that has a substantial effect on day-to-day activities). But note that the employer needs to be aware of your disability (either you disclosed it or they found out by other means), otherwise there is no way for them to address it. Chances are, they are aware if you provided relevant sick notes and/or explanations. Once the employer has knowledge of your disability, they have a duty to consider making reasonable adjustments for you. The employer must not treat you unfavourably because of something arising from your disability. You have these rights even if you’ve been employed for less than two years.",
		topicsOneOf: '',
		topicsAllOf: 'S,2y',
		topicsNoneOf: '',
	},
	{
		id: nanoid(),
		text:
			"Sickness issues\n\nSorry to hear your employer didn’t deal (or isn’t dealing) with your sickness issues well. Most employers will have a sickness policy, which they must follow. If your sick pay hasn’t been paid, you may have an unfair deductions of wages claim.\n\nYou might have a disability discrimination claim if your sickness absence was related to your disability (which is defined as a physical or mental long-term condition that has a substantial effect on day to day activities). But note that the employer needs to be aware of your disability (either you disclosed it or they found out by other means), otherwise there is no way for them to address it. Chances are, they are aware if you provided relevant sick notes and/or explanations. Once the employer has knowledge of your disability, they have a duty to consider making reasonable adjustments for you. The employer must not treat you unfavourably because of something arising from your disability.\n\nConsider having an Occupational Health assessment at work\n\nOccupational Health can be useful whether you want to stay in your job or negotiate an exit. They are there to advise your employer on your health issues so it’s important to get them on your side. If you feel that there are any ways that your employer has caused your illness, present these issues to them in a succinct and factual manner. If your doctor has signed you ‘fit to work’, but your employer is waiting on occupational health to make a decision and report before letting you return, you should be paid even if your allocated sick leave has expired. Read on for more information on sick leave rights.\n\nConsider taking sick leave\n\nPaid sick leave is a very useful tool if your employer is trying to push you out. Typically if an employer is using a bogus process it becomes very stressful, so that you might consider seeing a doctor to be signed off on sick leave. This makes it more difficult for the employer to progress with their process and means they may be more willing to negotiate an exit package with you. There is no need to remain in the office if you’re treated unfairly and it’s making you ill.\n\nIf you’ve been signed off sick for longer than 12 months\n\nAn illness can amount to a disability if it’s likely to last more than 12 months. If you are classified as disabled because of an accident or condition, your employer has additional responsibilities to make adjustments to accommodate your illness. The fact that they’re obligated to make adjustments for you can improve your chances of reaching an agreed settlement with them. Just remember, making reasonable adjustments does not include paying you to have time off work – you want to focus on what your employer needs to do to accommodate your return to work. If organising the return to work adjustments in your role is seeming to be too difficult for your employer, they may be prepared to pay you to leave instead, if you’re happy to take a settlement.\n\nHow much paid sick leave have you got left?\n\nHowever much sick leave you have remaining, if you’d like to leave your employment with a settlement it’s important to start negotiations as soon as possible. Employers will be more keen to pay you off if you’re costing them money without doing your job. If they can see that you’re guaranteed to not be back at work for 3 months for example, but they’re still paying you, they will find the idea of a settlement more appealing than if you only have a couple of weeks left of sick pay. They will hope that you resign, but it’s important to take full advantage of any paid sick leave you have and use this in your negotiations. Specialist employment lawyers are experienced in knowing how to approach employers and which tactics are best to employ in order to secure the best possible settlement for employees.\n\nAre you currently signed off sick and on full pay?\n\nWhile you are signed off sick and on full pay, your employer has a big issue – they are paying you but you’re not doing your job. If you want to negotiate an exit package to leave your job, you’re best placed to do so while you’re still on full pay. This is because at this point there is a real monetary benefit to your employer in agreeing an exit package with you.\n\nIn order to plan the best approach in your particular situation, it would in most cases deem appropriate to consult an employment lawyer with experience of these types of settlement.\n\nAre you currently signed off on reduced pay?\n\nThe best position to negotiate with your employer is when you’re still on full pay, even if signed off sick. This is because at the end of the day, most employers care more about losing money than anything else. It can be difficult to encourage your employer to reach a settlement if they’re not still paying you, so if you want to negotiate an exit package you should do so as soon as possible if already on reduced pay.\n\nFind an employment lawyer who will give you a consultation as their experience will help you reach a settlement swiftly while you still have bargaining power.\n\nAre you currently signed off on zero pay?\n\nIf your sickness is due to issues in your employment, typically people’s health does not improve until the issue is resolved. It can be tough but you should take steps to have your issues resolved as soon as possible. If your employment ends you may have access to benefits or be able to undertake a different type of employment. There may even still be a chance of reaching a fair settlement with your employer, e.g. if they envisage putting you on performance review when you return to work - this is a lengthy and costly process for them so you may be in a good position to negotiate an exit (we address it under 'Performance issues'). Consider consulting an employment lawyer to explore your options.",
		topicsOneOf: '',
		topicsAllOf: 'S',
		topicsNoneOf: '2y',
	},
	{
		id: nanoid(),
		text:
			"Unsafe workplace, e.g. coronavirus\n\nThat sounds bad. Your employer has a duty to look after your health and safety, whether you’re working in an office or outside.\n\nYou have the right to protect yourself or others if you have a reasonable belief that there is a serious and imminent danger at work and your employer isn’t taking reasonable steps to ensure the health and safety of staff. Coronavirus is considered to be a serious and imminent danger, but there may be other kinds of dangers too (e.g. exposed asbestos). For example, if it’s impossible to keep an appropriate social distance in your workplace, you may be justified in insisting on working from home. However, when the danger has passed (e.g. lockdown has finished or personal protective equipment has been provided if you're an essential worker), you should return to the workplace. If steps aren’t taken to ensure the workplace is safe, you can continue to exercise your rights and stay away. It’s unlawful for the employer to mistreat you because of taking this step (known as 'protected action'). Mistreatment can include, among other things, disciplinary action, reducing your pay or dismissing you. \n\nWhen it comes to coronavirus, there might be subtle pressure from your employer for you to come to the office during lockdown (government rules on this have been ambiguous), even if it's perfectly feasible to do your job from home. This can be tricky. If you want to do the right thing and maintain a good relationship with your employer, it may be worth raising it with them in a constructive way, i.e. explain that you're committed to the job but feel uncomfortable taking public transport for example, or you may have other complicating factors. \n\nIf you'd rather leave your job, you may use these points in your settlement negotiations. If you've been employed for longer than two years, you may want to argue that the employer's pressure is a repudiatory breach of your employment contract. This means you could resign and claim constructive unfair dismissal. If you've been employed for less than two years, you could either refuse to attend an unsafe workplace and take it from there, or just ask the employer for a settlement package as the alternative would be you refusing to attend and being entitled to full pay. It's more complicated if you're an essential worker and it's not possible to do your job from home (e.g. if you work in a supermarket or construction). But you're still entitled to an appropriately safe workplace (e.g. with personal protective equipment provided).   \n\nIf you're in a higher risk category regarding coronavirus due to your age, you may have an indirect age discrimination claim. Similarly, if you have a health condition that places you in a higher risk category, you may have a claim for disability discrimination. For this to be the case, your condition has to be long-term (typically over a year) and have a substantial effect on day-to-day activities. If the effect of the disability is minimised by medication use, it’s still a disability if your day-to-day life would be affected without the medication. For example, diabetes might be managed by insulin injections which would minimise its impact on one’s life, but if say an injection isn’t available one’s day-to-day functioning would definitely be affected. Making someone with diabetes attend a workplace which isn’t coronavirus secure may be disability discrimination as it would put them at a greater risk than others.\n\nIf you live with others who are vulnerable due to their age or medical conditions, they might be at risk if your workplace isn’t coronavirus secure as you might pass the infection to them. This may be age or disability discrimination by association.\n\nIf you're having to deal with health and safety issues at work, Virtual Lawyer can help you formulate your argument. If you feel your case isn't straightforward, an employment lawyer can really help you get the best outcome.",
		topicsOneOf: '',
		topicsAllOf: 'H',
		topicsNoneOf: '',
	},
	{
		id: nanoid(),
		text:
			'Toxic work environment\n\nThis can’t be easy to cope with. If the atmosphere in your workplace is really bad, it may amount to a repudiatory breach of your employment contract by your employer. This means you may be entitled to resign and claim constructive dismissal. As you’ve been employed for less than two years, you don’t have unfair dismissal rights, but you could claim constructive wrongful dismissal. With wrongful dismissal claims, you would normally be entitled to notice pay only. Bear in mind that to have a decent chance of success you need very convincing facts and strong evidence - in other words, the work environment has to be extremely bad and you need to be able to prove it.\n\nIf the toxic work environment exacerbated your mental or physical health issues, it may amount to disability discrimination. Bear in mind that the health condition has to be long-term (over a year) and have a substantial effect on your day-to-day activities, in order to be recognised as a disability in law. If you think this applies, you may have a disability discrimination claim.',
		topicsOneOf: '',
		topicsAllOf: 'TWE,E,2y',
		topicsNoneOf: '',
	},
	{
		id: nanoid(),
		text:
			'Toxic work environment\n\nThis can’t be easy to cope with. If the atmosphere in your workplace is really bad, it may amount to a repudiatory breach of your employment contract by your employer. This means you may be entitled to resign and claim constructive unfair dismissal. Bear in mind that to have a decent chance of success you need very convincing facts and strong evidence - in other words, the work environment has to be extremely bad and you need to be able to prove it. \n\nIf the toxic work environment exacerbated your mental or physical health issues, it may amount to disability discrimination. Bear in mind that the health condition has to be long-term (over a year) and have a substantial effect on your day-to-day activities, in order to be recognised as a disability in law. If you think this applies, you may have a disability discrimination claim.',
		topicsOneOf: '',
		topicsAllOf: 'TWE,E',
		topicsNoneOf: '2y',
	},
	{
		id: nanoid(),
		text:
			"Excessive workload\n\nThat sounds stressful. An excessive workload may amount to a repudiatory breach of your employment contract by your employer. This means you may be entitled to resign and claim constructive dismissal. As you’ve been employed for less than two years, you don’t have unfair dismissal rights, but you could claim constructive wrongful dismissal. With wrongful dismissal claims, you would normally be entitled to notice pay only. Bear in mind that what passes as excessive can be subjective, so it’s not an easy one to prove. Working time regulations specify a 48 hour working week, but you might have agreed under your employment contract to opt out of (i.e. not to be bound by) the 48 hour maximum. But even if this is the case, the employer cannot expect you to work unlimited hours or give you work that’s clearly unrealistic to complete within expected deadlines. If you feel you're in this territory, rather than simply having to work longish hours, you may have a constructive wrongful dismissal claim. \n\nIf the excessive workload exacerbated your mental or physical health issues, it may amount to disability discrimination. Bear in mind that the health condition has to be long-term (over a year) and have a substantial effect on your day-to-day activities, in order to be recognised as a disability in law. If you think this applies, you may have a disability discrimination claim.",
		topicsOneOf: '',
		topicsAllOf: 'EW,E,2y',
		topicsNoneOf: '',
	},
	{
		id: nanoid(),
		text:
			"Excessive workload\n\nThat sounds stressful. An excessive workload may amount to a repudiatory breach of your employment contract by your employer. This means you may be entitled to resign and claim constructive unfair dismissal. Bear in mind that what passes as excessive can be subjective, so it’s not an easy one to prove. Working time regulations specify a 48 hour working week, but you might have agreed under your employment contract to opt out of (i.e. not to be bound by) the 48 hour maximum. But even if this is the case, the employer cannot expect you to work unlimited hours or give you work that’s clearly unrealistic to complete within expected deadlines. If you feel you're in this territory (rather than simply having to work longish hours), you may have a constructive unfair dismissal claim.\n\nIf the excessive workload exacerbated your mental or physical health issues, it may amount to disability discrimination. Bear in mind that the health condition has to be long-term (over a year) and have a substantial effect on your day-to-day activities, in order to be recognised as a disability in law. If you think this applies, you may have a disability discrimination claim.",
		topicsOneOf: '',
		topicsAllOf: 'EW,E',
		topicsNoneOf: '2y',
	},
	{
		id: nanoid(),
		text:
			"Employer owes money\n\nYou may have a claim for unlawful deductions of wages. How do you know that the employer owes you money? For a start, your employment contract should say what wages you are entitled to and how they are to be paid. If you didn’t explicitly agree to being paid less than in the contract, any deduction has to be rectified. There may be types of payments other than basic wages - e.g. bonus, car allowance, sick pay, furlough payments etc. As these are your employer’s responsibility, withdrawing any such payments amounts to unlawful deductions of wages. This doesn't apply to money you have lost through being on sick leave or not being given sufficient work to meet your bonus targets or being underpaid compared to others (although such losses may be recoverable under other claims).\n\nNote that if your pay has been cut because you refused to attend work due to health and safety concerns, this is also an unlawful deduction of wages. (We address it in more detail if you chose ‘unsafe workplace’.)\n\nYou could bring an unlawful deductions of wages claim at an employment tribunal, which has a three months time limit. If you have other claims against your employer, you should bring them all together in an employment tribunal. Failing that, you could bring a money claim at a county court, where the time limit is much longer (six years).",
		topicsOneOf: '',
		topicsAllOf: 'M',
		topicsNoneOf: '',
	},
	{
		id: nanoid(),
		text:
			"No written employment terms\n\nLet's be clear - ‘written employment terms’ isn’t the same thing as an employment contract. The latter always exists if you’re employed, whether it’s in writing or not. An employment contract simply means agreement (oral or written) for you to work and for your employer to pay you for your work. However, the employer does have a legal duty to provide you with a written statement of more specific employment terms and conditions within two months of you starting employment. These have to include: your and your employer’s names, your starting date, your pay and how it’s to be paid, working hours, as well as details of the employer's internal procedures. These terms and conditions will be part of your employment contract.\n\nIf you weren’t provided with written terms, you could have a claim for failure to provide written employment particulars. However, an employment tribunal will only award compensation (two to four weeks’ gross pay) if you succeed in another substantive claim. E.g. if your employer didn’t pay you your salary and didn’t give your written employment terms, you can bring a claim for both unlawful deductions of wages and failure to provide written employment particulars. If, on the other hand, your employer’s only wrong was not to give you written employment terms, then you won’t get compensation on this basis alone.",
		topicsOneOf: '',
		topicsAllOf: 'F',
		topicsNoneOf: '',
	},
	{
		id: nanoid(),
		text:
			"Other bad treatment\n\nWe're sorry to hear your employer treated you badly. It’s hard to assess this kind of treatment in the abstract as it can be subjective, but if it’s really so bad it may amount to a repudiatory breach of your employment contract. This means you may be entitled to resign and claim constructive dismissal. As you’ve been employed for less than two years, you don’t have unfair dismissal rights, but you may be able to claim constructive wrongful dismissal. With wrongful dismissal claims, you would normally be entitled to notice pay only.",
		topicsOneOf: '',
		topicsAllOf: 'OBT,E,2y',
		topicsNoneOf: '',
	},
	{
		id: nanoid(),
		text:
			"Other bad treatment\n\nWe're sorry to hear your employer treated you badly. It’s hard to assess this kind of treatment in the abstract as it can be subjective, but if it’s really so bad it may amount to a repudiatory breach of your employment contract. This means you may be entitled to resign and claim constructive unfair dismissal.",
		topicsOneOf: '',
		topicsAllOf: 'OBT,E',
		topicsNoneOf: '2y',
	},
	{
		id: nanoid(),
		text:
			"You were treated badly because of complaining about something unlawful\n\nDo you think your employer is up to no good? Are they or have they done something that is against the law or are trying to cover something up? If you have complained about such wrongdoing to them or a relevant authority (i.e. made a ‘protected disclosure’) and have been mistreated as a result, you may have a whistleblowing claim.\n\nA few points to note here: \n\n-- What counts as employer's wrongdoing is quite broad but it doesn’t include everything. It specifically includes criminal acts (e.g. fraud); endangering health and safety or the environment; miscarriages of justice or failing to do something they’re obliged to do by law. It would also include an attempt by the company to hide what they have done.\n\n-- Your disclosure has to be specific enough - e.g. ‘You broke the law’ doesn’t contain specific information and therefore wouldn’t count as a protected disclosure. On the other hand, ‘You didn’t give anyone in our team any rest breaks this week’ is specific information. It refers to something that’s against working time regulations and possibly a health and safety danger, and so this would be a protected disclosure. \n\n-- There has to be a public interest in that disclosure, even if you complained about something done to you personally. E.g. ‘You didn’t give me any rest breaks this week’ does concern you personally, but disclosing it may well be in the public interest as it reflects your employer’s practice and it may affect others. \n\n-- You need to have (had) a reasonable belief that what you complained of was unlawful. In other words, honest mistakes are acceptable. E.g. if you reasonably believed you were due a rest break every four hours and complained based on that, it may count as a protected disclosure even though the law says rest breaks need to be given every six hours. The employer must not mistreat you because of your protected disclosure, even though they may not have been in breach of the law regarding rest breaks in the first place.\n\n-- You need to have made your protected disclosure (in other words, complained to or alerted) the management or any relevant authority. It’s better if the disclosure was made using formal channels, so that they can’t deny you blew the whistle.\n\n-- Have you been treated badly as a result? The answer needs to be yes. This obviously includes dismissal, but can be any other ‘detriment’ which is quite broad (e.g. losing out on promotions, being moved to a different department if it puts you in a worse position or increasing your workload). By the way, your employer is likely to be responsible for any mistreatment by your colleague(s) - e.g. if they start ostracising you because you blew the whistle.   \n \nIf you think your case satisfies all of the above, you’re in a good bargaining position. Companies generally don’t like it to be known that they are up to no good, which can be turned to your advantage. They will likely want to settle with you as the settlement agreement will have a mutual confidentiality clause. \n\nIf you did bring a claim, you could claim for any financial loss that you suffered as a result of mistreatment. Even if you haven’t suffered any financial loss, you can still claim for injury to feelings in respect of detriment during employment (the precise amount will be judged on the seriousness of the situation, but it can in principle be unlimited). The amount you ask for in settlement should reflect this. Note that if the only detriment is dismissal, then you don't get injury to feelings.\n\nWhat is the date you blew the whistle? It’s important to keep a record so that you can refer to the timing of any detrimental treatment as you will have to show that this was because of your whistleblowing (so e.g. if the mistreatment happened before you blew the whistle, it can't be because of it). It's also important that you're able to identify the date of the detrimental treatment as that is the date from which you have to start counting the time within which you can bring a claim in the employment tribunal (three months minus one day).",
		topicsOneOf: '',
		topicsAllOf: 'W',
		topicsNoneOf: '',
	},
	{
		id: nanoid(),
		text:
			"Discrimination\n\nThere is sometimes confusion as to what discrimination means. Not all unfair treatment is discrimination. In the majority of cases, discrimination can be defined as less favourable treatment or disadvantage compared to somebody else. So if your boss treats everyone badly, that’s not necessarily discrimination however bad the treatment might be. The reason for the less favourable treatment is important - it has to be because of one or more of the protected characteristics listed in the Equality Act 2010. These are: \n\n- Race (race, colour, nationality, ethnic or national origins)\n- Sex (male or female)\n- Age (a particular age or an age range)\n- Disability (physical or mental health condition that is long-term and has a substantial effect on day-to-day activities)\n- Pregnancy and maternity (from the very start of the pregnancy, provided employer is aware, and until the end of your maternity leave or your return to work if that’s earlier)\n- Sexual orientation (sexual attraction to people of the same sex, different sex or both)\n- Religion or belief (religious or philosophical beliefs or lack of belief)\n- Gender reassignment (gender identity not being the same as assigned at birth, regardless of whether you’ve had any treatment)\n- Marriage or civil partnership (people in a formal marriage or civil partnership only, not those who are single, divorced, engaged, living together etc)\n\nThis list is exhaustive. So if your boss treated you worse than male employees because you’re a woman, you may have a sex discrimination claim. If your boss treated you worse than other employees because you are a parent for example, that’s not a protected characteristic. As it’s not currently unlawful to discriminate against parents, you wouldn’t have a discrimination claim on this basis. However, as women still perform most childcare duties, discriminating against parents may amount to indirect sex discrimination (on which more below). Remember you may be discriminated against because of more than one protected characteristic (e.g. banning head covering may affect Muslim women). \n\nIn reality, proving discrimination can be difficult, so you should gather as much evidence as you can, including any written records, witnesses, keeping a diary and relevant statistics. Virtual Lawyer will help you formulate your discrimination argument. The most important thing to demonstrate particularly for direct discrimination is that you have been treated less favourably, i.e. worse, than somebody else of a different race, sex, religion etc who is in the same situation as you. This somebody else is known as a comparator - if at all possible, use a real comparator (e.g. a specific colleague or colleagues - say you and a specific other colleague both lost office keys, but only you were disciplined. If the other colleague is of a different race, you use them as a comparator to argue you were disciplined because of your race). If it's not possible to find a real person to compare yourself to, use a hypothetical comparator. This will often be appropriate when you are discriminated against based on social stereotypes (e.g. as a new mother you are questioned on how you are going to combine work and family. You don't have incontrovertible proof that no man has ever been asked the same question, but you can say it's highly unlikely that a man would be). Disability discrimination is an exception as you don't always need a comparator there (more on that under 'disability discrimination').\n\nTypes of discrimination \n\nThese are direct dicrimination, indirect discrimination, harassment and victimisation. There is also discrimination by association and discrimination by perception.\n\nDirect discrimination is when you’re treated less favourably than others because of your protected characteristic (race, sex, age etc - see above). Examples:\n\nDirect race discrimination: new boss often says African workers are ‘work why’ and staff soon find they are put on performance improvement plans.\nDirect sex discrimination: a woman interviewed for a new role and is asked if she plans to have children soon. She says she does, and does not get the job.\nDirect religious discrimination: refusing to employ a woman because she wears a hijab.\n\nIndirect discrimination is when an employer treats everyone the same but the effect of the treatment puts you at a disadvantage because of your protected characteristic. Indirect discrimination if often unintentional - it’s the effect that matters. In practice this could be any specific practice or policy (known as ‘provision, criterion or practice’) which may seem innocent enough but certain groups may find it harder to comply with it. Examples:\n\nIndirect race discrimination: asking all employees to take a written English test indirectly discriminates against non-native English speakers.  \nIndirect sex discrimination: not allowing part-time working is likely to put women at a disadvantage as women tend to have more childcare responsibilities than men. \nIndirect religious discrimination: banning head coverings for all workers may put Muslim women at a disadvantage.\n\nIndirect discrimination is only unlawful if the employer isn’t able to show that they have an objective justification for their policy, unrelated to the protected characteristic. It may be hard to justify a written English test if workers only need spoken English to do their job. On the other hand, not allowing part-time working may sometimes be justified by business reasons. Similarly, a head covering ban may be necessary for health and safety reasons in a healthcare setting, but the employer woud have to show exactly how head coverings endanger health and safety.\n\nHarassment is when there is unwanted conduct related to a relevant protected characteristic, which has the purpose or effect of violating an individual's dignity or creating an intimidating, hostile, degrading, humiliating or offensive environment for that individual. For example, repeatedly calling women in hijab 'letter boxes' and Muslims in general 'terrorists' in front of Muslim workers would be religious harassment. \n\nVictimisation is when you are treated badly because you have made a ‘protected act‘ (or because it is believed that you have done or are going to do so). A protected act is making a complaint of discrimination (discrimination against yourself or anybody else) or offering assistance to someone else in their discrimination claim. So victimisation is essentially retaliation for complaining about discrimination. It doesn't matter whether or not it was actually discrimination in the first place, as long as you believed it was. E.g. if you complain that you suffered race discrimination and are then transferred to another department because of your complaint, that transfer may be victimisation. The same applies if you complain that a colleague (rather than yourself) suffered race discrimination. \n\nDiscrimination by association is less frequent. It occurs when you are discriminated against because of somebody else's protected characteristic, e.g. if you are married to a person of another race or have a disabled family member you care for. \n\nDiscrimination by perception is when you are discriminated against because the discriminator thinks you have a certain protected characteristic even if in reality you don't. E.g. your boss treats you worse than others because he thinks you are gay even if you are not.",
		topicsOneOf: '',
		topicsAllOf: 'D',
		topicsNoneOf: '',
	},
	{
		id: nanoid(),
		text:
			'Age discrimination\n\nIf you have been treated less favourably at work due to your age (because you’re either younger or older than someone who is treated more favourably), then you need to start gathering evidence immediately. Keep copies of emails and take notes of meetings or conversations during which evidence of discrimination occurs.\n\nDirect age discrimination mostly occurs when two employees are being considered for promotion or are up against each other in a redundancy situation, and one is treated less favourably than the other due to their age.\n\nIndirect age discrimination mostly occurs in the operation of pay and benefits systems where a rule treats a group of younger or older employees less favourably than the other group.\n\nAlthough it’s unlawful to discriminate against an employee on the grounds of their age, even direct age discrimination is capable of being legally justified by your employer. Therefore they may have an adequate legal defence even if you can prove discrimination. For example, a retirement age in a company may discriminate against employees aged 65+, but the fact that the company policy contains a retirement age, although discriminatory, may be justified if the employer has genuine reasons for having it. Many employers still don’t quite understand age discrimination or its impact. Often younger employees replace older ones leaving an employer vulnerable to a claim. \n\nIn a negotiation, you will need to identify the person, or class of persons, who you believe have been treated more favourably than you on the grounds of your age. You will also need to identify how you have been subject to a detriment as a result of this treatment; for example: you have been passed over for promotion, you are paid less, you have been made redundant in favour of someone else younger.\n\nOnce you have identified these two important factors, you should attempt to gather evidence of the less favourable treatment and secure it. At this point you should raise the matter with your employer via a formal grievance in a clear manner. If you want to leave employment, you should also open up ‘without prejudice’ negotiations with your employer alleging age discrimination and also constructive dismissal as a proven incidence of discrimination would amount to a breach of trust and confidence, as well as discrimination.\nIf age discrimination is proved, it can cost a large company millions, so if you have evidence which can prove discrimination for yourself or a wider group of people, there is a good chance your employer will be keen to pay you off in order to keep you quiet.\n\nIf the discrimination you have identified applies to a large group of people, and not just yourself, you have two choices: you can either inform the others who are similarly affected and look to start a multiple-person grievance and then litigation (for which you would need a solicitor), or you can use this as a bargaining chip against your employer. In this case you can offer to sign a confidentiality clause in your settlement agreement preventing you from discussing the matter with other employees – there is certainly a value in this in terms of a negotiation tactic to get the best outcome for you as an individual.',
		topicsOneOf: '',
		topicsAllOf: 'DA',
		topicsNoneOf: '',
	},
	{
		id: nanoid(),
		text:
			"Disability discrimination\n\nFirst of all, let’s be clear as to what counts as a disability. Many people don’t think of themselves as disabled without realising they may benefit from disability discrimination protection. The law defines disability as a long-term condition that has a substantial effect on day-to-day activities. ‘Long-term’ means you need to have had it for over a year, and ‘condition’ can be either physical or mental health related, or indeed a genetic condition. Note you don’t necessarily need a confirmed medical diagnosis - sometimes doctors know there is something going on, but won’t necessarily be able to label it immediately (e.g. undiagnosed heart conditions). What if your condition is effectively managed by medication or other means, so that you don’t notice any day-to-day effects? It can still be a disability, if it would affect you had it not been for the medication. E.g. diabetes may be managed by insulin injections, but if these weren’t available there would definitely be an impact on one’s day-to-day activities.\n\nThere are different forms of disability discrimination, the main ones being direct, indirect and a failure to make reasonable adjustments. There is also unfavourable treatment because of something arising from a disability. What form of discrimination you have suffered depends upon your unique circumstances.\n\nTreating someone less favourably because they are disabled is direct discrimination and there is no legal defence to this discrimination.\n\nIndirect discrimination occurs when the employer’s practice puts disabled people at a disadvantage, even if that wasn’t the intention. For example, if all employees are required to use stairs due to the location of the office it will be harder for wheelchair users and thus indirect disability discrimination. However, this kind of disability discrimination may be legally justified if the employer has a good reason for their practice. In our example, it might be ok to require all employees to use stairs if the office is located in an old building where it would be impossible or extremely difficult or expensive to install a suitable lift.\n\nA failure to make reasonable adjustments occurs when a disabled employee is unable, due to their disability, to meet the usual expectations of other employees. An employer is obliged to put in place any reasonable measures that would support the employee in achieving the usual expectations. This could be, for example, the provision of a special chair to aid the disabled employee in sitting for long periods of time, or providing additional breaks. Note that in order to make reasonable adjustments, the employer needs to be aware of your disability (you need either to have disclosed it to them or they’re otherwise aware e.g. when it’s obvious). In other words, you can’t complain that nothing was done to help you with your mental health condition if you never told them about it in the first place.\n\nUnfavourable treatment because of something arising from a disability covers a wide range of mistreatment - for example, if you’ve been dismissed because you’ve been off sick with stress as the stress might be something arising from your mental health condition. This is easier to prove than direct discrimination, and you don’t need a comparator, i.e. don't need to show that somebody else was treated more favourably in similar circumstances (as you would in order to prove direct discrimination). This is because the circumstances in which disability discrimination occurs are often unique and it can be extremely difficult to find a comparator who is not disabled but in exactly the same situation as you.\n\nDisability discrimination is a complicated area of law and one which an experienced employment law solicitor is best placed to advise you on. If you can identify areas in which disability discrimination exists in your organisation, there is scope to negotiate an attractive settlement agreement if you are wanting to leave your employment.",
		topicsOneOf: '',
		topicsAllOf: 'DD',
		topicsNoneOf: '',
	},
	{
		id: nanoid(),
		text:
			"Pregnancy discrimination\n\nThis is still very common, so understandably the decision when to tell your employer about your pregnancy is not an easy one. Many employers will be perfectly fine with that (as they should be), but many women find problems start after they announce they are pregnant even if the job went perfectly well before. If you are in that unfortunate situation, you may benefit from pregnancy discrimination law.\n\nThe law specifically protects you during the 'protected period', which runs from the very start of the pregnancy and until the end of your maternity leave or your return to work if that's earlier (we address the latter under 'maternity discrimination'). The employer needs to be aware of your pregnancy for you to benefit from pregnancy discrimination law. You are not obliged to tell them until 20 weeks before your planned maternity leave, but you can't claim pregnancy discrimination if they didn't know you were pregnant (it might of course become obvious as the pregnancy advances).\n\nIn practice it can be difficult to prove pregnancy discrimination as the employer will typically deny it. You have to prove that they knew you were pregnant and that their less favourable treatment of you (any performance management, transfer, dismissal etc) was in fact because of your pregnancy. Many employers will deny any knowledge of pregnancy even if you clearly told them. It's a good idea to have a written record even if you've already told them personally (e.g. send an email shortly afterwards saying 'As we discussed in today's meeting, I am 3 months pregnant and I am planning to work until my due date'). If you then experience a sudden or significant change in treatment (e.g. if the employer starts looking for faults with your work and puts you on a performance improvement plan), there is a plausible argument that this is because of your pregnancy. This argument doesn't work if e.g. performance issues had already been raised before your pregnancy or before the employer knew you were pregnant - it would be easy for them to demonstrate that it was for reasons other than your pregnancy.",
		topicsOneOf: '',
		topicsAllOf: 'DP',
		topicsNoneOf: '',
	},
	{
		id: nanoid(),
		text:
			"Maternity discrimination\n\nLike pregnancy, maternity discrimination is unfortunately very common. Many women returning from maternity leave are offered settlement agreements or redundancy payments as their employer has decided, for example, that it can either do without them, or the employer believes that the care of a child will inhibit the woman’s ability to fulfil her duties at work.\n\nThe law protects you from discrimination during the 'protected period', which starts at the start of your pregnancy and ends at the end of your maternity leave or when you return to work if that's earlier. Any decision by an employer to dismiss a woman either during or upon her return from maternity leave, leaves the employer vulnerable to a claim of discrimination. You need to gather evidence and start thinking about your strategy immediately if you think you are being discriminated against because of this.",
		topicsOneOf: '',
		topicsAllOf: 'DM',
		topicsNoneOf: '',
	},
	{
		id: nanoid(),
		text:
			'Race discrimination\n\nSadly, it’s still all too common in the workplace. Most instances of race discrimination are in the form of direct discrimination (treating a Person A less favourably than Person B because of their race or ethnicity) or harassment because of a person’s race (e.g. making racist jokes). \n\nThe difficulty is that these days direct race discrimination tends to be insidious, rather than overt. Employers are more likely to discriminate covertly, even unconsciously, which means that there is usually very little documentary evidence available and you can expect them to deny it. If there is any evidence it must be gathered and secured before taking any further steps. Any written record is good, but if there are others who are prepared to be witnesses in your favour, that’s also useful. \n\nYou should formulate your arguments in a clear manner, using a comparator for direct discrimination. E.g. if both you and somebody else of a different race did the same thing and only you were disciplined, that shows less favourable treatment because of race - although the employer will of course try to come up with a different reason for such difference in treatment.\n\nOur letter building tool will help you with the formulation, but a professional solicitor can really help to assess the evidence and formulate a clear legal argument so that the employer can’t deny discrimination, in order to get you a healthy settlement package.',
		topicsOneOf: '',
		topicsAllOf: 'DR',
		topicsNoneOf: '',
	},
	{
		id: nanoid(),
		text:
			"Sex discrimination\n\nThis relates to discrimination against men or women. The vast majority of sex discrimination is against women, but it's possible for a man to claim it as well. E.g. a man is told off because he leaves the office at 5.30pm, as opposed to staying late, because he wants to spend time with his family. He may be able to claim sex discrimination if he can show that women who have a family are not expected to work late. \n\nEqual pay is a type of discrimination, although techinically it's a separate claim. You may have an equal pay claim if you are paid less than a colleague of the opposite sex for equal work or work of equal value. Technically, either a man or a woman can bring an equal pay claim, but in practice women tend to be underpaid compared to men, as shown by the gender pay gap.\n\nDiscrimination because of gender identity is covered by 'gender reassignment'. It's possible to experience both types of discrimination simultaneously - e.g. a trans woman may be treated less favourably both because women are generally treated worse than men in her workplace and because the boss isn't comfortable with her being trans.",
		topicsOneOf: '',
		topicsAllOf: 'DS',
		topicsNoneOf: '',
	},
	{
		id: nanoid(),
		text:
			"Sexual Orientation\n\nThis relates to sexual attraction to people of the same sex, different sex or both - broadly speaking, gay, lesbian, straight or bisexual orientation, although there are many more terms that would fall within this definition). This kind of discrimination is still common in many workplaces as the employer or colleagues may not like you referring to your same-sex partner or frequenting certain places associated with being gay. Subjecting you to any less favourable treatment because of this is unlawful. This protected characteristic doesn't cover many other expressions of sexuality or sexual preference, e.g. BDSM or polyamory.",
		topicsOneOf: '',
		topicsAllOf: 'DSy',
		topicsNoneOf: '',
	},
	{
		id: nanoid(),
		text:
			"Gender reassignment\n\nThis means gender identity not being the same as assigned at birth. As this definition is so broad, it gives a good level of protection to most people. You don't need to have had any treatment, medical or otherwise, to be protected from discrimination because of your gender identity. Note that sometimes it's not easy to disentagle gender from gender identity, e.g. if you've experienced adverse treatment as a trans woman it could be that your boss treats all women worse than men (straightforward sex discrimination), or it could be that he doesn't like trans people (discrimination because of gender reassignment), or trans women more specifically (both types of discrimination).",
		topicsOneOf: '',
		topicsAllOf: 'DG',
		topicsNoneOf: '',
	},
	{
		id: nanoid(),
		text:
			'Religious belief\n\nThis covers all mainstream religions (Christianity, Islam, Judaism, Hinduism, Buddism, Sikhism etc) as well as any less known ones, provided they have a clear structure and belief system. In practice this means adherents of less known religions have this extra step of proving their religion or religious belief system is worthy of protection. A lack of religious belief (e.g. atheism) is also protected.',
		topicsOneOf: '',
		topicsAllOf: 'DRn',
		topicsNoneOf: '',
	},
	{
		id: nanoid(),
		text:
			"Philosophical belief\n\nThis covers non-religious beliefs that are serious enough to affect your whole way of life. This is a high hurdle, certainly harder to establish than religious belief. You will first have to show that your philosophical belief has a degree of cohesion, coherence and importance to be a plausible system of belief (examples include atheism, agnosticism, pacifism). Second, you have to show that it governs your whole way of life. And third, it has to be worthy of protection in a democratic society. E.g. 'ethical veganism' has been recognised to be a protected philosophical belief in principle, but it's not enough not to eat animal products as a lifestyle choice - you need to show how live by the ethical issues values of veganism (e.g. avoid any use of animal products, campaign for animal rights). Nazism or white supremacy would be examples of beliefs not worthy of protection in a democratic society, even though they may well have an internally coherent belief system and there might be people who live by them.",
		topicsOneOf: '',
		topicsAllOf: 'DPl',
		topicsNoneOf: '',
	},
	{
		id: nanoid(),
		text:
			"Marriage or civil partnership status\n\nThis is the least common protected characteristic - you'll be forgiven if you've never heard of it. It covers people who are in a formal marriage or civil partnership only (including marriages or civil partnerships registered abroad, provided they are legally recognised in the UK). It doesn't cover people who are single, divorced, had their civil partnership dissolved, engaged, living together and so on. This kind of discrimination might occur if the employer provides better benefits to people who are single, compared to those who are marriaged or in a civil partnership.",
		topicsOneOf: '',
		topicsAllOf: 'DMe',
		topicsNoneOf: '',
	},
	{
		id: nanoid(),
		text:
			"You have been treated badly because you complained about discrimination\n\nYou may have a victimisation claim. Victimisation is when you are treated badly because you have made a ‘protected act‘ (or because it is believed that you have done or are going to do so). A protected act is making a complaint of discrimination (discrimination against yourself or anybody else) or offering assistance to someone else in their discrimination claim. So victimisation is essentially retaliation for complaining about discrimination. It doesn't matter whether or not it was actually discrimination in the first place, as long as you believed it was. E.g. if you complain that you suffered race discrimination and are then transferred to another department because of your complaint, that transfer may be victimisation. The same applies if you complain that a colleague (rather than yourself) suffered race discrimination and receive some adverse treatment because of it. The adverse treatment of you will be victimisation even if it turns out you were genuinely mistaken and the colleague wasn't subjected to any less favourable treatment at all. One important point: you need to have made it clear in your complaint that it's about discrimination - you don't need to use the word 'discrimination' itself, but you might say e.g. 'I was denied promotion because I am black' (referring to race would make it a protected act). If you say e.g. 'I was denied promotion and I am upset about it', that wouldn't necessarily be a protected act as your complaint doesn't refer to any discrimination.",
		topicsOneOf: '',
		topicsAllOf: 'DV',
		topicsNoneOf: '',
	},
]

/* 


export const filterByExactTopicMatch = (data: TemplateParagraph[], topic: string): TemplateParagraph[] => {
	if (!topic) {
		return data
	}
	return data.filter((value: any) => value.topic === topic)
}

//
// export const filterByOrMatch = (data: Paragraph[], topic: string[]): Paragraph[] => {
//     if (!(topic?.length > 0)) {
//         return data;
//     }
//
//     return data.filter(({ topicList }) => {
//         return topic.some(r => topicList?.indexOf(r) >= 0 )
//     })
// }

const matchAllOfTopics = (ptopics: string[], utopics: string[]): boolean => {
	if (!(ptopics?.length > 0)) {
		return true
	}
	//separate the array and apply logic to D and Rest
	return ptopics.every(r => {
		if (utopics?.indexOf(r) >= 0) {
			return true
		}

		if (utopics.includes(ParagraphTopicMapping.DISCRIMINATION)) {
			if (DSubTopics.includes(r)) {
				return true
			}
		}

		if (r === ParagraphTopicMapping.DISCRIMINATION) {
			if (DSubTopics.some(x => utopics?.indexOf(x) >= 0)) {
				return true
			}
		}

		return false
	})
}

const matchNoneOfTopics = (ptopics: string[], utopics: string[]): boolean => {
	if (!(ptopics?.length > 0)) {
		return true
	}

	//separate the array and apply logic to D and Rest
	return ptopics.every(r => {
		if (utopics?.indexOf(r) >= 0) {
			return false
		}

		if (utopics.includes(ParagraphTopicMapping.DISCRIMINATION)) {
			if (DSubTopics.includes(r)) {
				return false
			}
		}

		if (r === ParagraphTopicMapping.DISCRIMINATION) {
			if (DSubTopics.some(x => utopics?.indexOf(x) >= 0)) {
				return false
			}
		}

		return true
	})
}

export const filterByGeneralMatch = (data: TemplateParagraph[], topics: CaseTopic[]): TemplateParagraph[] => {
	if (!(topics?.length > 0)) {
		return data
	}

	//removing any duplication

	const utopics = [...new Set(topics.map(({ id }) => id))]

	const newData = data.filter((value: TemplateParagraph) => {
		const { topicsOneOf = [], topicsAllOf = [], topicsNoneOf = [] } = value.paragraph
		//@ts-ignore
		const topicsOneOfF = topicsOneOf.filter(x => x !== '')
		//@ts-ignore
		const topicsAllOfF = topicsAllOf.filter(x => x !== '')
		//@ts-ignore
		const topicsNoneOfF = topicsNoneOf.filter(x => x !== '')

		const eitherFlag = topicsOneOfF.length > 0 ? topicsOneOfF.some(r => utopics?.indexOf(r) >= 0) : true

		const mustFlag = matchAllOfTopics(topicsAllOfF, utopics)

		const notFlag = matchNoneOfTopics(topicsNoneOfF, utopics)

		return eitherFlag && mustFlag && notFlag
	})

	/* console.log(
		'filterByGeneralMatch return ',
		filterByGeneralMatch.length,
		'paras'
	) * /

	return newData
} */
