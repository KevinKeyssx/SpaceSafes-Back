export const PaginationDoc = {
	PAGE : { name: 'page', required: false, type: Number, description: 'Número de página a obtener' },
	EACH: { name: 'each', required: false, type: Number, description: 'Cantidad de elementos por página' },
	ORDER: { name: 'order', required: false, enum: ['asc', 'desc'], description: 'Orden de los resultados (asc o desc)' }
};
