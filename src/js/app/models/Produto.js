export class Produto {
  constructor(id, name, price, parcelamento, color, image, size, date) {
    this._id = id;
    this._name = name;
    this._price = price;
    this._parcelamento = parcelamento;
    this._color = color;
    this._image = image;
    this._size = size;
    this._date = date;
    Object.freeze(this);
  }

  get produto() {
    return new Produto(
      this._id,
      this._name,
      this._price,
      this._parcelamento,
      this._color,
      this._image,
      this.size,
      this._date
    );
  }
}
