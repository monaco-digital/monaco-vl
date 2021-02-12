import { gql } from '@apollo/client'

const optionsList = gql`
	fragment FOptionsList on OptionsList {
		_id
		id
		options {
			labelFirstPerson
			labelThirdPerson
			value
		}
		meta {
			...FMeta
		}
	}
`
