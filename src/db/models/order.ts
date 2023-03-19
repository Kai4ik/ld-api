import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";
import { Optional } from "sequelize";
import Item from "./items.js";

interface OrderAttributes {
  id: string;
  orderDate: Date;
  orderBy: string;
  items: Item[];
}

type OrderCreationAttributes = Optional<OrderAttributes, "id">;

@Table({
  timestamps: false,
  tableName: "orders",
})
class Order extends Model<OrderAttributes, OrderCreationAttributes> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
  })
  id!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  orderDate!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  orderBy!: string;

  @HasMany(() => Item)
  items!: Item[];
}

export default Order;
