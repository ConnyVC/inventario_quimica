import { Table, Column, DataType, Model, HasMany } from 'sequelize-typescript'
import Consumo from './Consumo'

@Table({ tableName: 'tbl_asignatura', timestamps: false })
class Asignatura extends Model {
  @Column({ type: DataType.SMALLINT.UNSIGNED, primaryKey: true, autoIncrement: true, field: 'id_asignatura' })
  declare idAsignatura: number

  @Column({ type: DataType.STRING(15), allowNull: false, field: 'codigo_asignatura' })
  declare codigoAsignatura: string

  @Column({ type: DataType.STRING(100), allowNull: false, field: 'nombre_asignatura' })
  declare nombreAsignatura: string

  @Column({ type: DataType.TINYINT, defaultValue: 1, field: 'estado' })
  declare estado: number

  @HasMany(() => Consumo)
  declare consumos: Consumo[]
}

export default Asignatura