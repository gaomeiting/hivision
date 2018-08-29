export default class Book {
	constructor({
		id,
		name,
		content,
		cover,
		buyLink
	}) {

		this.id = id;
		this.name = name;
		this.cover = cover;
		this.content = content;
		this.buyLink = buyLink;
	}
}
export function CreateBook({
	id,
	name,
	content,
	cover,
	buyLink
}) {
	return new Book({
		id,
		name,
		content,
		cover,
		buyLink
	})
}