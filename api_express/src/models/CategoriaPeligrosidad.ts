import { Table, Column, DataType, Model, HasMany } from 'sequelize-typescript'
import Reactivo from './Reactivo'

@Table({
  tableName: 'tbl_categoria_peligrosidad',
  timestamps: false
})
class CategoriaPeligrosidad extends Model {
  @Column({
    type: DataType.TINYINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_categoria'
  })
  declare idCategoria: number

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    field: 'nombre_categoria'
  })
  declare nombreCategoria: string

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    field: 'pictograma'
  })
  declare pictograma: string

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    field: 'descripcion'
  })
  declare descripcion: string

  @HasMany(() => Reactivo)
  declare reactivos: Reactivo[]
}

export default CategoriaPeligrosidad