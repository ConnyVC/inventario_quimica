import { Table, Column, DataType, Model, ForeignKey, BelongsTo } from 'sequelize-typescript'
import Usuario from './Usuario'

@Table({ tableName: 'tbl_historial_modificaciones', timestamps: false })
class HistorialModificacion extends Model {
  @Column({ type: DataType.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true, field: 'id_historial' })
  declare idHistorial: number

  @ForeignKey(() => Usuario)
  @Column({ type: DataType.SMALLINT.UNSIGNED, allowNull: false, field: 'id_usuario' })
  declare idUsuario: number

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW, field: 'fecha_accion' })
  declare fechaAccion: Date

  @Column({ type: DataType.STRING(20), allowNull: false, field: 'accion_realizada' })
  declare accionRealizada: string

  @Column({ type: DataType.STRING(50), allowNull: false, field: 'tabla_afectada' })
  declare tablaAfectada: string

  @Column({ type: DataType.INTEGER.UNSIGNED, allowNull: false, field: 'registro_afectado' })
  declare registroAfectado: number

  @Column({ type: DataType.STRING(255), allowNull: true, field: 'descripcion' })
  declare descripcion: string

  @BelongsTo(() => Usuario)
  declare usuario: Usuario
}

export default HistorialModificacion