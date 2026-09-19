import { Table, Column, DataType, Model, HasMany } from 'sequelize-typescript'
import Lote from './Lote'

@Table({ tableName: 'tbl_marca', timestamps: false })
class Marca extends Model {
  @Column({ type: DataType.SMALLINT.UNSIGNED, primaryKey: true, autoIncrement: true, field: 'id_marca' })
  declare idMarca: number

  @Column({ type: DataType.STRING(50), allowNull: false, field: 'nombre_marca' })
  declare nombreMarca: string

  @Column({ type: DataType.TINYINT, defaultValue: 1, field: 'estado' })
  declare estado: number

  @HasMany(() => Lote)
  declare lotes: Lote[]
}

export default Marca