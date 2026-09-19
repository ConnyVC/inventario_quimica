import { Table, Column, DataType, Model, ForeignKey, BelongsTo, HasOne } from 'sequelize-typescript'
import Lote from './Lote'
import Usuario from './Usuario'
import Consumo from './Consumo'

@Table({ tableName: 'tbl_movimiento', timestamps: false })
class Movimiento extends Model {
  @Column({ type: DataType.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true, field: 'id_movimiento' })
  declare idMovimiento: number

  @ForeignKey(() => Lote)
  @Column({ type: DataType.MEDIUMINT.UNSIGNED, allowNull: false, field: 'id_lote' })
  declare idLote: number

  @Column({ type: DataType.ENUM('Ingreso', 'Despacho', 'Devolucion'), allowNull: false, field: 'tipo_movimiento' })
  declare tipoMovimiento: string

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW, field: 'fecha_movimiento' })
  declare fechaMovimiento: Date

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false, field: 'cantidad' })
  declare cantidad: number

  @Column({ type: DataType.STRING(255), allowNull: true, field: 'observacion' })
  declare observacion: string

  @ForeignKey(() => Usuario)
  @Column({ type: DataType.SMALLINT.UNSIGNED, allowNull: false, field: 'id_usuario' })
  declare idUsuario: number

  @BelongsTo(() => Lote)
  declare lote: Lote

  @BelongsTo(() => Usuario)
  declare usuario: Usuario

  @HasOne(() => Consumo)
  declare consumo: Consumo
}

export default Movimiento