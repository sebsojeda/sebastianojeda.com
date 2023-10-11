export function formatDate(str: string): string {
	const date = new Date(str);
	const year = date.getFullYear();
	const month = date.getMonth();
	const day = date.getDate();
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];
	return `${months[month]} ${day}, ${year}`;
}
