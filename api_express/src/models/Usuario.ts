import { Table, Column, DataType, Model, ForeignKey, BelongsTo, HasMany, BeforeCreate } from 'sequelize-typescript'
import Rol from './Rol'
import Movimiento from './Movimiento'
import MermaAjuste from './MermaAjuste'
import bcrypt from 'bcrypt'

@Table({ tableName: 'tbl_usuario', timestamps: false })
class Usuario extends Model {
  @Column({ type: DataType.SMALLINT.UNSIGNED, primaryKey: true, autoIncrement: true, field: 'id_usuario' })
  declare idUsuario: number

  @Column({ type: DataType.STRING(12), allowNull: false, field: 'rut' })
  declare rut: string

  @Column({ type: DataType.STRING(50), allowNull: false, field: 'nombres' })
  declare nombres: string

  @Column({ type: DataType.STRING(30), allowNull: false, field: 'apellido_paterno' })
  declare apellidoPaterno: string

  @Column({ type: DataType.STRING(30), allowNull: true, field: 'apellido_materno' })
  declare apellidoMaterno: string

  @Column({ type: DataType.STRING(100), allowNull: false, unique: true, field: 'correo_institucional' })
  declare correoInstitucional: string

  @Column({ type: DataType.STRING(255), allowNull: false, field: 'contrasena' })
  declare contrasena: string

  @Column({ type: DataType.TINYINT, defaultValue: 1, field: 'estado' })
  declare estado: number

  @ForeignKey(() => Rol)
  @Column({ type: DataType.TINYINT.UNSIGNED, allowNull: false, field: 'id_rol' })
  declare idRol: number

  @BelongsTo(() => Rol)
  declare rol: Rol

  @HasMany(() => Movimiento)
  declare movimientos: Movimiento[]

  @HasMany(() => MermaAjuste)
  declare mermasAjustes: MermaAjuste[]

  @BeforeCreate
  static async hashPassword(usuario: Usuario) {
    usuario.contrasena = await bcrypt.hash(usuario.contrasena, 10)
  }
}

export default Usuario