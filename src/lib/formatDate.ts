export function formatDate(date: string): string {
	const [year, month, day] = date.split('-').map((item) => parseInt(item, 10));
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
