import { Table, Column, DataType, Model, HasMany } from 'sequelize-typescript'
import Usuario from './Usuario'

@Table({ tableName: 'tbl_rol', timestamps: false })
class Rol extends Model {
  @Column({ type: DataType.TINYINT.UNSIGNED, primaryKey: true, autoIncrement: true, field: 'id_rol' })
  declare idRol: number

  @Column({ type: DataType.STRING(30), allowNull: false, field: 'nombre_rol' })
  declare nombreRol: string

  @Column({ type: DataType.STRING(255), allowNull: true, field: 'descripcion' })
  declare descripcion: string

  @HasMany(() => Usuario)
  declare usuarios: Usuario[]
}

export default Rol