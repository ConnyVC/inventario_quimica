import { Table, Column, DataType, Model, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript'
import Reactivo from './Reactivo'
import Marca from './Marca'
import Movimiento from './Movimiento'
import MermaAjuste from './MermaAjuste'

@Table({ tableName: 'tbl_lote', timestamps: false })
class Lote extends Model {
  @Column({ type: DataType.MEDIUMINT.UNSIGNED, primaryKey: true, autoIncrement: true, field: 'id_lote' })
  declare idLote: number

  @ForeignKey(() => Reactivo)
  @Column({ type: DataType.SMALLINT.UNSIGNED, allowNull: false, field: 'id_reactivo' })
  declare idReactivo: number

  @Column({ type: DataType.DATEONLY, allowNull: false, field: 'fecha_ingreso' })
  declare fechaIngreso: string

  @Column({ type: DataType.DATEONLY, allowNull: false, field: 'fecha_vencimiento' })
  declare fechaVencimiento: string

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false, field: 'cantidad_ingresada' })
  declare cantidadIngresada: number

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false, field: 'stock_disponible' })
  declare stockDisponible: number

  @ForeignKey(() => Marca)
  @Column({ type: DataType.SMALLINT.UNSIGNED, allowNull: false, field: 'id_marca' })
  declare idMarca: number

  @BelongsTo(() => Reactivo)
  declare reactivo: Reactivo

  @BelongsTo(() => Marca)
  declare marca: Marca

  @HasMany(() => Movimiento)
  declare movimientos: Movimiento[]

  @HasMany(() => MermaAjuste)
  declare mermasAjustes: MermaAjuste[]
}

export default Lote