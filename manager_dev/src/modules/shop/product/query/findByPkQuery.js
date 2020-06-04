export default (id, filter) => {
	return {
		params: {
			id
		},
		query: {
			filter: {
				include: [{
						association: "layout",
						include: ["fields"]
					},
					"productfields",
					{
						association: "parent",
						include: ["translations"]
					},
					"translations",
					"resourcetype",
					"context"
				],
				...filter
			}
		}
	};
};
