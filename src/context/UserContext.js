import * as React from 'react'

export default React.createContext({
	user: null,
	setUser: (val) => {
		return val
	}
})
