import { Table, Column, DataType, Model, HasMany } from 'sequelize-typescript'
import Consumo from './Consumo'

@Table({ tableName: 'tbl_docente', timestamps: false })
class Docente extends Model {
  @Column({ type: DataType.SMALLINT.UNSIGNED, primaryKey: true, autoIncrement: true, field: 'id_docente' })
  declare idDocente: number

  @Column({ type: DataType.STRING(12), allowNull: false, field: 'rut' })
  declare rut: string

  @Column({ type: DataType.STRING(60), allowNull: false, field: 'nombres' })
  declare nombres: string

  @Column({ type: DataType.STRING(40), allowNull: false, field: 'apellido_paterno' })
  declare apellidoPaterno: string

  @Column({ type: DataType.STRING(40), allowNull: true, field: 'apellido_materno' })
  declare apellidoMaterno: string

  @Column({ type: DataType.STRING(100), allowNull: false, unique: true, field: 'correo_institucional' })
  declare correoInstitucional: string

  @Column({ type: DataType.TINYINT, defaultValue: 1, field: 'estado' })
  declare estado: number

  @HasMany(() => Consumo)
  declare consumos: Consumo[]
}

export default Docente