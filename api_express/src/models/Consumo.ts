import { Table, Column, DataType, Model, ForeignKey, BelongsTo } from 'sequelize-typescript'
import Movimiento from './Movimiento'
import Asignatura from './Asignatura'
import Docente from './Docente'

@Table({ tableName: 'tbl_consumo', timestamps: false })
class Consumo extends Model {
  @Column({ type: DataType.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true, field: 'id_consumo' })
  declare idConsumo: number

  @ForeignKey(() => Movimiento)
  @Column({ type: DataType.INTEGER.UNSIGNED, allowNull: false, field: 'id_movimiento' })
  declare idMovimiento: number

  @ForeignKey(() => Asignatura)
  @Column({ type: DataType.SMALLINT.UNSIGNED, allowNull: false, field: 'id_asignatura' })
  declare idAsignatura: number

  @ForeignKey(() => Docente)
  @Column({ type: DataType.SMALLINT.UNSIGNED, allowNull: false, field: 'id_docente' })
  declare idDocente: number

  @Column({ type: DataType.STRING(150), allowNull: false, field: 'actividad_practica' })
  declare actividadPractica: string

  @BelongsTo(() => Movimiento)
  declare movimiento: Movimiento

  @BelongsTo(() => Asignatura)
  declare asignatura: Asignatura

  @BelongsTo(() => Docente)
  declare docente: Docente
}

export default Consumo