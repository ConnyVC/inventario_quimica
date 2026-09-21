import { Table, Column, DataType, Model, ForeignKey, BelongsTo } from 'sequelize-typescript'
import Lote from './Lote'
import Usuario from './Usuario'

@Table({ tableName: 'tbl_merma_ajuste', timestamps: false })
class MermaAjuste extends Model {
  @Column({ type: DataType.MEDIUMINT.UNSIGNED, primaryKey: true, autoIncrement: true, field: 'id_ajuste' })
  declare idAjuste: number

  @ForeignKey(() => Lote)
  @Column({ type: DataType.MEDIUMINT.UNSIGNED, allowNull: false, field: 'id_lote' })
  declare idLote: number

  @Column({ type: DataType.ENUM('Entrada', 'Salida'), allowNull: false, field: 'tipo_ajuste' })
  declare tipoAjuste: string

  @Column({
    type: DataType.ENUM('Vencimiento', 'Contaminacion', 'Quiebre/Deterioro', 'Ajuste Por Conteo', 'Otro'),
    allowNull: false,
    field: 'motivo_ajuste'
  })
  declare motivoAjuste: string

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW, field: 'fecha_ajuste' })
  declare fechaAjuste: Date

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false, field: 'cantidad_afectada' })
  declare cantidadAfectada: number

  @Column({ type: DataType.STRING(255), allowNull: true, field: 'observacion' })
  declare observacion: string

  @ForeignKey(() => Usuario)
  @Column({ type: DataType.SMALLINT.UNSIGNED, allowNull: false, field: 'id_usuario' })
  declare idUsuario: number

  @BelongsTo(() => Lote)
  declare lote: Lote

  @BelongsTo(() => Usuario)
  declare usuario: Usuario
}

export default MermaAjuste