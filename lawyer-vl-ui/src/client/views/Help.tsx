import React from 'react'

export const Help: React.FC = () => {
	return (
		<div className={'helpsection'}>
			<h1>Virtual Lawyer help</h1>

			<h2>
				<u>What does it do?</u>
			</h2>
			<p>
				Virtual Lawyer helps you to build a legal letter based on your
				circumstances. It combines years of experience in the employment law
				sector with technology to empower users to help themselves.
			</p>
			<br />
			<br />

			<h2>
				<u>When should I use it?</u>
			</h2>
			<p>
				This tool can be used for a variety of situations:
				<ul>
					<li>
						You want to write and send a formal letter to your employer
						yourself, and want help to compose it
					</li>
					<li>
						You want to draft a legal letter that you can get a lawyer to review
					</li>
					<li>
						You just want to understand a bit more about the legal arguments
						that apply to your situation, to take forward into discussions
					</li>
				</ul>
			</p>
			<br />
			<br />

			<h2>
				<u>How does it work?</u>
			</h2>
			<p>The app will take you through a three-step process:</p>
			<br />
			<br />

			<h3>1. Answer questions about your case</h3>
			<p>
				The tool will ask you a series of questions about your situation and
				recommend a selection of paragraphs that you can include into a legal
				letter based on your answers.
			</p>
			<br />
			<br />

			<h3>2. Construct a letter from paragraphs</h3>
			<p>
				You read through these suggested paragraphs, and pick the ones that are
				most appropriate to your case. You can toggle between a summary view of
				the paragraph which helps you understand the key points you are making
				and a detailed, legalese version which will be included in the final
				output.
			</p>
			<br />
			<br />

			<h3>3. Preview and amend your draft letter</h3>
			<p>
				Once you are happy with the paragraphs you have selected, you can
				preview the final letter. You can then copy this into your preferred
				word processing tool to make the final tweaks, or create a new google
				doc for this purpose.
			</p>
			<br />
			<br />

			<h2>
				<u>I am having some problems using it</u>
			</h2>
			<p>
				This is a beta product which we are actively working on. If you are
				having issues or have found a bug, please get in touch with us and we
				will do our best to address your questions. Our contact email address is{' '}
				<a href="mailto:communications@monacosolicitors.co.uk">
					communications@monacosolicitors.co.uk
				</a>{' '}
			</p>
			<br />
			<br />

			<h2>
				<u>Feedback</u>
			</h2>
			<p>
				If you have feedback about what works well, what doesn’t work well, or
				what you would like to see please get in touch at{' '}
				<a href="mailto:communications@monacosolicitors.co.uk">
					communications@monacosolicitors.co.uk
				</a>
			</p>
		</div>
	)
}

export default Help
