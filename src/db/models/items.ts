import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Optional } from "sequelize";
import Order from "./order.js";

export interface ItemAttributes {
  id: number;
  itemTitle: string;
  itemDescription: string;
  itemPrice: number;
  itemStatus: string;
  soldBy: string;
  boughtBy: string;
  orderId: string;
  order: Order;
}

type ItemCreationAttributes = Optional<ItemAttributes, "id">;

@Table({
  timestamps: false,
  tableName: "items",
})
class Item extends Model<ItemAttributes, ItemCreationAttributes> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
  })
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  itemTitle!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  itemDescription!: string;

  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
  })
  itemPrice!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  itemStatus!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  soldBy!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  boughtBy!: string;

  @ForeignKey(() => Order)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  orderId!: number;

  @BelongsTo(() => Order)
  order!: Order;
}

export default Item;
