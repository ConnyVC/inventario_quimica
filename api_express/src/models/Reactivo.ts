import { Table, Column, DataType, Model, ForeignKey, BelongsTo } from 'sequelize-typescript'
import CategoriaPeligrosidad from './CategoriaPeligrosidad'

@Table({
  tableName: 'tbl_reactivo',
  timestamps: false
})
class Reactivo extends Model {
  @Column({
    type: DataType.SMALLINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_reactivo'
  })
  declare idReactivo: number

  @Column({
    type: DataType.STRING(150),
    allowNull: false,
    field: 'nombre_quimico'
  })
  declare nombreQuimico: string

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
    field: 'formula_quimica'
  })
  declare formulaQuimica: string

  @Column({
    type: DataType.ENUM('g', 'kg', 'mL', 'L', 'unidad'),
    allowNull: false,
    field: 'unidad_medida'
  })
  declare unidadMedida: string

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00,
    field: 'punto_reorden_minimo'
  })
  declare puntoReordenMinimo: number

  @ForeignKey(() => CategoriaPeligrosidad)
  @Column({
    type: DataType.TINYINT.UNSIGNED,
    allowNull: false,
    field: 'id_categoria'
  })
  declare idCategoria: number

  @Column({
    type: DataType.TINYINT,
    defaultValue: 1,
    field: 'estado'
  })
  declare estado: number

  @Column({
    type: DataType.DECIMAL(12, 2),
    defaultValue: 0.00,
    field: 'cantidad_disponible'
  })
  declare cantidadDisponible: number

  @BelongsTo(() => CategoriaPeligrosidad)
  declare categoria: CategoriaPeligrosidad
}

export default Reactivo