export default class PKgroup {
	constructor({
		bookId,
		bookName,
		pkGroupId,
		redPlayer,
		bluePlayer
	}) {

		this.bookId = bookId;
		this.bookName = bookName;
		this.pkGroupId = pkGroupId;
		this.redPlayer = redPlayer;
		this.bluePlayer = bluePlayer;
	}
}
export function CreatePKgroup({
	bookId,
	bookName,
	pkGroupId,
	redPlayer,
	bluePlayer
}) {
	return new PKgroup({
		bookId,
		bookName,
		pkGroupId,
		redPlayer,
		bluePlayer
	})
}