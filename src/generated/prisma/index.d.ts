
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Meeting
 * 
 */
export type Meeting = $Result.DefaultSelection<Prisma.$MeetingPayload>
/**
 * Model MeetingParticipant
 * 
 */
export type MeetingParticipant = $Result.DefaultSelection<Prisma.$MeetingParticipantPayload>
/**
 * Model MeetingDocument
 * 
 */
export type MeetingDocument = $Result.DefaultSelection<Prisma.$MeetingDocumentPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  DOSEN: 'DOSEN',
  ADMIN: 'ADMIN'
};

export type Role = (typeof Role)[keyof typeof Role]


export const Status: {
  AKTIF: 'AKTIF',
  SELESAI: 'SELESAI',
  ARSIP: 'ARSIP'
};

export type Status = (typeof Status)[keyof typeof Status]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type Status = $Enums.Status

export const Status: typeof $Enums.Status

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.meeting`: Exposes CRUD operations for the **Meeting** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Meetings
    * const meetings = await prisma.meeting.findMany()
    * ```
    */
  get meeting(): Prisma.MeetingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.meetingParticipant`: Exposes CRUD operations for the **MeetingParticipant** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MeetingParticipants
    * const meetingParticipants = await prisma.meetingParticipant.findMany()
    * ```
    */
  get meetingParticipant(): Prisma.MeetingParticipantDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.meetingDocument`: Exposes CRUD operations for the **MeetingDocument** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MeetingDocuments
    * const meetingDocuments = await prisma.meetingDocument.findMany()
    * ```
    */
  get meetingDocument(): Prisma.MeetingDocumentDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Meeting: 'Meeting',
    MeetingParticipant: 'MeetingParticipant',
    MeetingDocument: 'MeetingDocument'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "meeting" | "meetingParticipant" | "meetingDocument"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Meeting: {
        payload: Prisma.$MeetingPayload<ExtArgs>
        fields: Prisma.MeetingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MeetingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MeetingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingPayload>
          }
          findFirst: {
            args: Prisma.MeetingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MeetingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingPayload>
          }
          findMany: {
            args: Prisma.MeetingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingPayload>[]
          }
          create: {
            args: Prisma.MeetingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingPayload>
          }
          createMany: {
            args: Prisma.MeetingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MeetingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingPayload>[]
          }
          delete: {
            args: Prisma.MeetingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingPayload>
          }
          update: {
            args: Prisma.MeetingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingPayload>
          }
          deleteMany: {
            args: Prisma.MeetingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MeetingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MeetingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingPayload>[]
          }
          upsert: {
            args: Prisma.MeetingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingPayload>
          }
          aggregate: {
            args: Prisma.MeetingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMeeting>
          }
          groupBy: {
            args: Prisma.MeetingGroupByArgs<ExtArgs>
            result: $Utils.Optional<MeetingGroupByOutputType>[]
          }
          count: {
            args: Prisma.MeetingCountArgs<ExtArgs>
            result: $Utils.Optional<MeetingCountAggregateOutputType> | number
          }
        }
      }
      MeetingParticipant: {
        payload: Prisma.$MeetingParticipantPayload<ExtArgs>
        fields: Prisma.MeetingParticipantFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MeetingParticipantFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingParticipantPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MeetingParticipantFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingParticipantPayload>
          }
          findFirst: {
            args: Prisma.MeetingParticipantFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingParticipantPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MeetingParticipantFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingParticipantPayload>
          }
          findMany: {
            args: Prisma.MeetingParticipantFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingParticipantPayload>[]
          }
          create: {
            args: Prisma.MeetingParticipantCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingParticipantPayload>
          }
          createMany: {
            args: Prisma.MeetingParticipantCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MeetingParticipantCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingParticipantPayload>[]
          }
          delete: {
            args: Prisma.MeetingParticipantDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingParticipantPayload>
          }
          update: {
            args: Prisma.MeetingParticipantUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingParticipantPayload>
          }
          deleteMany: {
            args: Prisma.MeetingParticipantDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MeetingParticipantUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MeetingParticipantUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingParticipantPayload>[]
          }
          upsert: {
            args: Prisma.MeetingParticipantUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingParticipantPayload>
          }
          aggregate: {
            args: Prisma.MeetingParticipantAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMeetingParticipant>
          }
          groupBy: {
            args: Prisma.MeetingParticipantGroupByArgs<ExtArgs>
            result: $Utils.Optional<MeetingParticipantGroupByOutputType>[]
          }
          count: {
            args: Prisma.MeetingParticipantCountArgs<ExtArgs>
            result: $Utils.Optional<MeetingParticipantCountAggregateOutputType> | number
          }
        }
      }
      MeetingDocument: {
        payload: Prisma.$MeetingDocumentPayload<ExtArgs>
        fields: Prisma.MeetingDocumentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MeetingDocumentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingDocumentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MeetingDocumentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingDocumentPayload>
          }
          findFirst: {
            args: Prisma.MeetingDocumentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingDocumentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MeetingDocumentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingDocumentPayload>
          }
          findMany: {
            args: Prisma.MeetingDocumentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingDocumentPayload>[]
          }
          create: {
            args: Prisma.MeetingDocumentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingDocumentPayload>
          }
          createMany: {
            args: Prisma.MeetingDocumentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MeetingDocumentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingDocumentPayload>[]
          }
          delete: {
            args: Prisma.MeetingDocumentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingDocumentPayload>
          }
          update: {
            args: Prisma.MeetingDocumentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingDocumentPayload>
          }
          deleteMany: {
            args: Prisma.MeetingDocumentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MeetingDocumentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MeetingDocumentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingDocumentPayload>[]
          }
          upsert: {
            args: Prisma.MeetingDocumentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingDocumentPayload>
          }
          aggregate: {
            args: Prisma.MeetingDocumentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMeetingDocument>
          }
          groupBy: {
            args: Prisma.MeetingDocumentGroupByArgs<ExtArgs>
            result: $Utils.Optional<MeetingDocumentGroupByOutputType>[]
          }
          count: {
            args: Prisma.MeetingDocumentCountArgs<ExtArgs>
            result: $Utils.Optional<MeetingDocumentCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    meeting?: MeetingOmit
    meetingParticipant?: MeetingParticipantOmit
    meetingDocument?: MeetingDocumentOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    meetings: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meetings?: boolean | UserCountOutputTypeCountMeetingsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMeetingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MeetingParticipantWhereInput
  }


  /**
   * Count Type MeetingCountOutputType
   */

  export type MeetingCountOutputType = {
    participants: number
    documents: number
  }

  export type MeetingCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    participants?: boolean | MeetingCountOutputTypeCountParticipantsArgs
    documents?: boolean | MeetingCountOutputTypeCountDocumentsArgs
  }

  // Custom InputTypes
  /**
   * MeetingCountOutputType without action
   */
  export type MeetingCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingCountOutputType
     */
    select?: MeetingCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MeetingCountOutputType without action
   */
  export type MeetingCountOutputTypeCountParticipantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MeetingParticipantWhereInput
  }

  /**
   * MeetingCountOutputType without action
   */
  export type MeetingCountOutputTypeCountDocumentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MeetingDocumentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    nama: string | null
    role: $Enums.Role | null
    tandaTangan: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    nama: string | null
    role: $Enums.Role | null
    tandaTangan: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    nama: number
    role: number
    tandaTangan: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    nama?: true
    role?: true
    tandaTangan?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    nama?: true
    role?: true
    tandaTangan?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    nama?: true
    role?: true
    tandaTangan?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    password: string
    nama: string
    role: $Enums.Role
    tandaTangan: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    nama?: boolean
    role?: boolean
    tandaTangan?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    meetings?: boolean | User$meetingsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    nama?: boolean
    role?: boolean
    tandaTangan?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    nama?: boolean
    role?: boolean
    tandaTangan?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    nama?: boolean
    role?: boolean
    tandaTangan?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "nama" | "role" | "tandaTangan" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meetings?: boolean | User$meetingsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      meetings: Prisma.$MeetingParticipantPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      nama: string
      role: $Enums.Role
      tandaTangan: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    meetings<T extends User$meetingsArgs<ExtArgs> = {}>(args?: Subset<T, User$meetingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MeetingParticipantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly nama: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly tandaTangan: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.meetings
   */
  export type User$meetingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingParticipant
     */
    select?: MeetingParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MeetingParticipant
     */
    omit?: MeetingParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingParticipantInclude<ExtArgs> | null
    where?: MeetingParticipantWhereInput
    orderBy?: MeetingParticipantOrderByWithRelationInput | MeetingParticipantOrderByWithRelationInput[]
    cursor?: MeetingParticipantWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MeetingParticipantScalarFieldEnum | MeetingParticipantScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Meeting
   */

  export type AggregateMeeting = {
    _count: MeetingCountAggregateOutputType | null
    _min: MeetingMinAggregateOutputType | null
    _max: MeetingMaxAggregateOutputType | null
  }

  export type MeetingMinAggregateOutputType = {
    id: string | null
    namaRapat: string | null
    startDateTime: Date | null
    endDateTime: Date | null
    agenda: string | null
    notulensiRapat: string | null
    status: $Enums.Status | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MeetingMaxAggregateOutputType = {
    id: string | null
    namaRapat: string | null
    startDateTime: Date | null
    endDateTime: Date | null
    agenda: string | null
    notulensiRapat: string | null
    status: $Enums.Status | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MeetingCountAggregateOutputType = {
    id: number
    namaRapat: number
    startDateTime: number
    endDateTime: number
    agenda: number
    notulensiRapat: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MeetingMinAggregateInputType = {
    id?: true
    namaRapat?: true
    startDateTime?: true
    endDateTime?: true
    agenda?: true
    notulensiRapat?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MeetingMaxAggregateInputType = {
    id?: true
    namaRapat?: true
    startDateTime?: true
    endDateTime?: true
    agenda?: true
    notulensiRapat?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MeetingCountAggregateInputType = {
    id?: true
    namaRapat?: true
    startDateTime?: true
    endDateTime?: true
    agenda?: true
    notulensiRapat?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MeetingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Meeting to aggregate.
     */
    where?: MeetingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Meetings to fetch.
     */
    orderBy?: MeetingOrderByWithRelationInput | MeetingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MeetingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Meetings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Meetings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Meetings
    **/
    _count?: true | MeetingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MeetingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MeetingMaxAggregateInputType
  }

  export type GetMeetingAggregateType<T extends MeetingAggregateArgs> = {
        [P in keyof T & keyof AggregateMeeting]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMeeting[P]>
      : GetScalarType<T[P], AggregateMeeting[P]>
  }




  export type MeetingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MeetingWhereInput
    orderBy?: MeetingOrderByWithAggregationInput | MeetingOrderByWithAggregationInput[]
    by: MeetingScalarFieldEnum[] | MeetingScalarFieldEnum
    having?: MeetingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MeetingCountAggregateInputType | true
    _min?: MeetingMinAggregateInputType
    _max?: MeetingMaxAggregateInputType
  }

  export type MeetingGroupByOutputType = {
    id: string
    namaRapat: string
    startDateTime: Date
    endDateTime: Date
    agenda: string | null
    notulensiRapat: string | null
    status: $Enums.Status
    createdAt: Date
    updatedAt: Date
    _count: MeetingCountAggregateOutputType | null
    _min: MeetingMinAggregateOutputType | null
    _max: MeetingMaxAggregateOutputType | null
  }

  type GetMeetingGroupByPayload<T extends MeetingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MeetingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MeetingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MeetingGroupByOutputType[P]>
            : GetScalarType<T[P], MeetingGroupByOutputType[P]>
        }
      >
    >


  export type MeetingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    namaRapat?: boolean
    startDateTime?: boolean
    endDateTime?: boolean
    agenda?: boolean
    notulensiRapat?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    participants?: boolean | Meeting$participantsArgs<ExtArgs>
    documents?: boolean | Meeting$documentsArgs<ExtArgs>
    _count?: boolean | MeetingCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["meeting"]>

  export type MeetingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    namaRapat?: boolean
    startDateTime?: boolean
    endDateTime?: boolean
    agenda?: boolean
    notulensiRapat?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["meeting"]>

  export type MeetingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    namaRapat?: boolean
    startDateTime?: boolean
    endDateTime?: boolean
    agenda?: boolean
    notulensiRapat?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["meeting"]>

  export type MeetingSelectScalar = {
    id?: boolean
    namaRapat?: boolean
    startDateTime?: boolean
    endDateTime?: boolean
    agenda?: boolean
    notulensiRapat?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MeetingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "namaRapat" | "startDateTime" | "endDateTime" | "agenda" | "notulensiRapat" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["meeting"]>
  export type MeetingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    participants?: boolean | Meeting$participantsArgs<ExtArgs>
    documents?: boolean | Meeting$documentsArgs<ExtArgs>
    _count?: boolean | MeetingCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MeetingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type MeetingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $MeetingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Meeting"
    objects: {
      participants: Prisma.$MeetingParticipantPayload<ExtArgs>[]
      documents: Prisma.$MeetingDocumentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      namaRapat: string
      startDateTime: Date
      endDateTime: Date
      agenda: string | null
      notulensiRapat: string | null
      status: $Enums.Status
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["meeting"]>
    composites: {}
  }

  type MeetingGetPayload<S extends boolean | null | undefined | MeetingDefaultArgs> = $Result.GetResult<Prisma.$MeetingPayload, S>

  type MeetingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MeetingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MeetingCountAggregateInputType | true
    }

  export interface MeetingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Meeting'], meta: { name: 'Meeting' } }
    /**
     * Find zero or one Meeting that matches the filter.
     * @param {MeetingFindUniqueArgs} args - Arguments to find a Meeting
     * @example
     * // Get one Meeting
     * const meeting = await prisma.meeting.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MeetingFindUniqueArgs>(args: SelectSubset<T, MeetingFindUniqueArgs<ExtArgs>>): Prisma__MeetingClient<$Result.GetResult<Prisma.$MeetingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Meeting that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MeetingFindUniqueOrThrowArgs} args - Arguments to find a Meeting
     * @example
     * // Get one Meeting
     * const meeting = await prisma.meeting.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MeetingFindUniqueOrThrowArgs>(args: SelectSubset<T, MeetingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MeetingClient<$Result.GetResult<Prisma.$MeetingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Meeting that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingFindFirstArgs} args - Arguments to find a Meeting
     * @example
     * // Get one Meeting
     * const meeting = await prisma.meeting.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MeetingFindFirstArgs>(args?: SelectSubset<T, MeetingFindFirstArgs<ExtArgs>>): Prisma__MeetingClient<$Result.GetResult<Prisma.$MeetingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Meeting that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingFindFirstOrThrowArgs} args - Arguments to find a Meeting
     * @example
     * // Get one Meeting
     * const meeting = await prisma.meeting.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MeetingFindFirstOrThrowArgs>(args?: SelectSubset<T, MeetingFindFirstOrThrowArgs<ExtArgs>>): Prisma__MeetingClient<$Result.GetResult<Prisma.$MeetingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Meetings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Meetings
     * const meetings = await prisma.meeting.findMany()
     * 
     * // Get first 10 Meetings
     * const meetings = await prisma.meeting.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const meetingWithIdOnly = await prisma.meeting.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MeetingFindManyArgs>(args?: SelectSubset<T, MeetingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MeetingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Meeting.
     * @param {MeetingCreateArgs} args - Arguments to create a Meeting.
     * @example
     * // Create one Meeting
     * const Meeting = await prisma.meeting.create({
     *   data: {
     *     // ... data to create a Meeting
     *   }
     * })
     * 
     */
    create<T extends MeetingCreateArgs>(args: SelectSubset<T, MeetingCreateArgs<ExtArgs>>): Prisma__MeetingClient<$Result.GetResult<Prisma.$MeetingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Meetings.
     * @param {MeetingCreateManyArgs} args - Arguments to create many Meetings.
     * @example
     * // Create many Meetings
     * const meeting = await prisma.meeting.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MeetingCreateManyArgs>(args?: SelectSubset<T, MeetingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Meetings and returns the data saved in the database.
     * @param {MeetingCreateManyAndReturnArgs} args - Arguments to create many Meetings.
     * @example
     * // Create many Meetings
     * const meeting = await prisma.meeting.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Meetings and only return the `id`
     * const meetingWithIdOnly = await prisma.meeting.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MeetingCreateManyAndReturnArgs>(args?: SelectSubset<T, MeetingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MeetingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Meeting.
     * @param {MeetingDeleteArgs} args - Arguments to delete one Meeting.
     * @example
     * // Delete one Meeting
     * const Meeting = await prisma.meeting.delete({
     *   where: {
     *     // ... filter to delete one Meeting
     *   }
     * })
     * 
     */
    delete<T extends MeetingDeleteArgs>(args: SelectSubset<T, MeetingDeleteArgs<ExtArgs>>): Prisma__MeetingClient<$Result.GetResult<Prisma.$MeetingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Meeting.
     * @param {MeetingUpdateArgs} args - Arguments to update one Meeting.
     * @example
     * // Update one Meeting
     * const meeting = await prisma.meeting.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MeetingUpdateArgs>(args: SelectSubset<T, MeetingUpdateArgs<ExtArgs>>): Prisma__MeetingClient<$Result.GetResult<Prisma.$MeetingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Meetings.
     * @param {MeetingDeleteManyArgs} args - Arguments to filter Meetings to delete.
     * @example
     * // Delete a few Meetings
     * const { count } = await prisma.meeting.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MeetingDeleteManyArgs>(args?: SelectSubset<T, MeetingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Meetings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Meetings
     * const meeting = await prisma.meeting.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MeetingUpdateManyArgs>(args: SelectSubset<T, MeetingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Meetings and returns the data updated in the database.
     * @param {MeetingUpdateManyAndReturnArgs} args - Arguments to update many Meetings.
     * @example
     * // Update many Meetings
     * const meeting = await prisma.meeting.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Meetings and only return the `id`
     * const meetingWithIdOnly = await prisma.meeting.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MeetingUpdateManyAndReturnArgs>(args: SelectSubset<T, MeetingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MeetingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Meeting.
     * @param {MeetingUpsertArgs} args - Arguments to update or create a Meeting.
     * @example
     * // Update or create a Meeting
     * const meeting = await prisma.meeting.upsert({
     *   create: {
     *     // ... data to create a Meeting
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Meeting we want to update
     *   }
     * })
     */
    upsert<T extends MeetingUpsertArgs>(args: SelectSubset<T, MeetingUpsertArgs<ExtArgs>>): Prisma__MeetingClient<$Result.GetResult<Prisma.$MeetingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Meetings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingCountArgs} args - Arguments to filter Meetings to count.
     * @example
     * // Count the number of Meetings
     * const count = await prisma.meeting.count({
     *   where: {
     *     // ... the filter for the Meetings we want to count
     *   }
     * })
    **/
    count<T extends MeetingCountArgs>(
      args?: Subset<T, MeetingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MeetingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Meeting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MeetingAggregateArgs>(args: Subset<T, MeetingAggregateArgs>): Prisma.PrismaPromise<GetMeetingAggregateType<T>>

    /**
     * Group by Meeting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MeetingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MeetingGroupByArgs['orderBy'] }
        : { orderBy?: MeetingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MeetingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMeetingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Meeting model
   */
  readonly fields: MeetingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Meeting.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MeetingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    participants<T extends Meeting$participantsArgs<ExtArgs> = {}>(args?: Subset<T, Meeting$participantsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MeetingParticipantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    documents<T extends Meeting$documentsArgs<ExtArgs> = {}>(args?: Subset<T, Meeting$documentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MeetingDocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Meeting model
   */
  interface MeetingFieldRefs {
    readonly id: FieldRef<"Meeting", 'String'>
    readonly namaRapat: FieldRef<"Meeting", 'String'>
    readonly startDateTime: FieldRef<"Meeting", 'DateTime'>
    readonly endDateTime: FieldRef<"Meeting", 'DateTime'>
    readonly agenda: FieldRef<"Meeting", 'String'>
    readonly notulensiRapat: FieldRef<"Meeting", 'String'>
    readonly status: FieldRef<"Meeting", 'Status'>
    readonly createdAt: FieldRef<"Meeting", 'DateTime'>
    readonly updatedAt: FieldRef<"Meeting", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Meeting findUnique
   */
  export type MeetingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Meeting
     */
    omit?: MeetingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingInclude<ExtArgs> | null
    /**
     * Filter, which Meeting to fetch.
     */
    where: MeetingWhereUniqueInput
  }

  /**
   * Meeting findUniqueOrThrow
   */
  export type MeetingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Meeting
     */
    omit?: MeetingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingInclude<ExtArgs> | null
    /**
     * Filter, which Meeting to fetch.
     */
    where: MeetingWhereUniqueInput
  }

  /**
   * Meeting findFirst
   */
  export type MeetingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Meeting
     */
    omit?: MeetingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingInclude<ExtArgs> | null
    /**
     * Filter, which Meeting to fetch.
     */
    where?: MeetingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Meetings to fetch.
     */
    orderBy?: MeetingOrderByWithRelationInput | MeetingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Meetings.
     */
    cursor?: MeetingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Meetings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Meetings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Meetings.
     */
    distinct?: MeetingScalarFieldEnum | MeetingScalarFieldEnum[]
  }

  /**
   * Meeting findFirstOrThrow
   */
  export type MeetingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Meeting
     */
    omit?: MeetingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingInclude<ExtArgs> | null
    /**
     * Filter, which Meeting to fetch.
     */
    where?: MeetingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Meetings to fetch.
     */
    orderBy?: MeetingOrderByWithRelationInput | MeetingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Meetings.
     */
    cursor?: MeetingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Meetings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Meetings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Meetings.
     */
    distinct?: MeetingScalarFieldEnum | MeetingScalarFieldEnum[]
  }

  /**
   * Meeting findMany
   */
  export type MeetingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Meeting
     */
    omit?: MeetingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingInclude<ExtArgs> | null
    /**
     * Filter, which Meetings to fetch.
     */
    where?: MeetingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Meetings to fetch.
     */
    orderBy?: MeetingOrderByWithRelationInput | MeetingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Meetings.
     */
    cursor?: MeetingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Meetings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Meetings.
     */
    skip?: number
    distinct?: MeetingScalarFieldEnum | MeetingScalarFieldEnum[]
  }

  /**
   * Meeting create
   */
  export type MeetingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Meeting
     */
    omit?: MeetingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingInclude<ExtArgs> | null
    /**
     * The data needed to create a Meeting.
     */
    data: XOR<MeetingCreateInput, MeetingUncheckedCreateInput>
  }

  /**
   * Meeting createMany
   */
  export type MeetingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Meetings.
     */
    data: MeetingCreateManyInput | MeetingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Meeting createManyAndReturn
   */
  export type MeetingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Meeting
     */
    omit?: MeetingOmit<ExtArgs> | null
    /**
     * The data used to create many Meetings.
     */
    data: MeetingCreateManyInput | MeetingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Meeting update
   */
  export type MeetingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Meeting
     */
    omit?: MeetingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingInclude<ExtArgs> | null
    /**
     * The data needed to update a Meeting.
     */
    data: XOR<MeetingUpdateInput, MeetingUncheckedUpdateInput>
    /**
     * Choose, which Meeting to update.
     */
    where: MeetingWhereUniqueInput
  }

  /**
   * Meeting updateMany
   */
  export type MeetingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Meetings.
     */
    data: XOR<MeetingUpdateManyMutationInput, MeetingUncheckedUpdateManyInput>
    /**
     * Filter which Meetings to update
     */
    where?: MeetingWhereInput
    /**
     * Limit how many Meetings to update.
     */
    limit?: number
  }

  /**
   * Meeting updateManyAndReturn
   */
  export type MeetingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Meeting
     */
    omit?: MeetingOmit<ExtArgs> | null
    /**
     * The data used to update Meetings.
     */
    data: XOR<MeetingUpdateManyMutationInput, MeetingUncheckedUpdateManyInput>
    /**
     * Filter which Meetings to update
     */
    where?: MeetingWhereInput
    /**
     * Limit how many Meetings to update.
     */
    limit?: number
  }

  /**
   * Meeting upsert
   */
  export type MeetingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Meeting
     */
    omit?: MeetingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingInclude<ExtArgs> | null
    /**
     * The filter to search for the Meeting to update in case it exists.
     */
    where: MeetingWhereUniqueInput
    /**
     * In case the Meeting found by the `where` argument doesn't exist, create a new Meeting with this data.
     */
    create: XOR<MeetingCreateInput, MeetingUncheckedCreateInput>
    /**
     * In case the Meeting was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MeetingUpdateInput, MeetingUncheckedUpdateInput>
  }

  /**
   * Meeting delete
   */
  export type MeetingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Meeting
     */
    omit?: MeetingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingInclude<ExtArgs> | null
    /**
     * Filter which Meeting to delete.
     */
    where: MeetingWhereUniqueInput
  }

  /**
   * Meeting deleteMany
   */
  export type MeetingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Meetings to delete
     */
    where?: MeetingWhereInput
    /**
     * Limit how many Meetings to delete.
     */
    limit?: number
  }

  /**
   * Meeting.participants
   */
  export type Meeting$participantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingParticipant
     */
    select?: MeetingParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MeetingParticipant
     */
    omit?: MeetingParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingParticipantInclude<ExtArgs> | null
    where?: MeetingParticipantWhereInput
    orderBy?: MeetingParticipantOrderByWithRelationInput | MeetingParticipantOrderByWithRelationInput[]
    cursor?: MeetingParticipantWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MeetingParticipantScalarFieldEnum | MeetingParticipantScalarFieldEnum[]
  }

  /**
   * Meeting.documents
   */
  export type Meeting$documentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingDocument
     */
    select?: MeetingDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MeetingDocument
     */
    omit?: MeetingDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingDocumentInclude<ExtArgs> | null
    where?: MeetingDocumentWhereInput
    orderBy?: MeetingDocumentOrderByWithRelationInput | MeetingDocumentOrderByWithRelationInput[]
    cursor?: MeetingDocumentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MeetingDocumentScalarFieldEnum | MeetingDocumentScalarFieldEnum[]
  }

  /**
   * Meeting without action
   */
  export type MeetingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Meeting
     */
    omit?: MeetingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingInclude<ExtArgs> | null
  }


  /**
   * Model MeetingParticipant
   */

  export type AggregateMeetingParticipant = {
    _count: MeetingParticipantCountAggregateOutputType | null
    _min: MeetingParticipantMinAggregateOutputType | null
    _max: MeetingParticipantMaxAggregateOutputType | null
  }

  export type MeetingParticipantMinAggregateOutputType = {
    meetingId: string | null
    userId: string | null
  }

  export type MeetingParticipantMaxAggregateOutputType = {
    meetingId: string | null
    userId: string | null
  }

  export type MeetingParticipantCountAggregateOutputType = {
    meetingId: number
    userId: number
    _all: number
  }


  export type MeetingParticipantMinAggregateInputType = {
    meetingId?: true
    userId?: true
  }

  export type MeetingParticipantMaxAggregateInputType = {
    meetingId?: true
    userId?: true
  }

  export type MeetingParticipantCountAggregateInputType = {
    meetingId?: true
    userId?: true
    _all?: true
  }

  export type MeetingParticipantAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MeetingParticipant to aggregate.
     */
    where?: MeetingParticipantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MeetingParticipants to fetch.
     */
    orderBy?: MeetingParticipantOrderByWithRelationInput | MeetingParticipantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MeetingParticipantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MeetingParticipants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MeetingParticipants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MeetingParticipants
    **/
    _count?: true | MeetingParticipantCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MeetingParticipantMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MeetingParticipantMaxAggregateInputType
  }

  export type GetMeetingParticipantAggregateType<T extends MeetingParticipantAggregateArgs> = {
        [P in keyof T & keyof AggregateMeetingParticipant]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMeetingParticipant[P]>
      : GetScalarType<T[P], AggregateMeetingParticipant[P]>
  }




  export type MeetingParticipantGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MeetingParticipantWhereInput
    orderBy?: MeetingParticipantOrderByWithAggregationInput | MeetingParticipantOrderByWithAggregationInput[]
    by: MeetingParticipantScalarFieldEnum[] | MeetingParticipantScalarFieldEnum
    having?: MeetingParticipantScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MeetingParticipantCountAggregateInputType | true
    _min?: MeetingParticipantMinAggregateInputType
    _max?: MeetingParticipantMaxAggregateInputType
  }

  export type MeetingParticipantGroupByOutputType = {
    meetingId: string
    userId: string
    _count: MeetingParticipantCountAggregateOutputType | null
    _min: MeetingParticipantMinAggregateOutputType | null
    _max: MeetingParticipantMaxAggregateOutputType | null
  }

  type GetMeetingParticipantGroupByPayload<T extends MeetingParticipantGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MeetingParticipantGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MeetingParticipantGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MeetingParticipantGroupByOutputType[P]>
            : GetScalarType<T[P], MeetingParticipantGroupByOutputType[P]>
        }
      >
    >


  export type MeetingParticipantSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    meetingId?: boolean
    userId?: boolean
    meeting?: boolean | MeetingDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["meetingParticipant"]>

  export type MeetingParticipantSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    meetingId?: boolean
    userId?: boolean
    meeting?: boolean | MeetingDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["meetingParticipant"]>

  export type MeetingParticipantSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    meetingId?: boolean
    userId?: boolean
    meeting?: boolean | MeetingDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["meetingParticipant"]>

  export type MeetingParticipantSelectScalar = {
    meetingId?: boolean
    userId?: boolean
  }

  export type MeetingParticipantOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"meetingId" | "userId", ExtArgs["result"]["meetingParticipant"]>
  export type MeetingParticipantInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meeting?: boolean | MeetingDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MeetingParticipantIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meeting?: boolean | MeetingDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MeetingParticipantIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meeting?: boolean | MeetingDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $MeetingParticipantPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MeetingParticipant"
    objects: {
      meeting: Prisma.$MeetingPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      meetingId: string
      userId: string
    }, ExtArgs["result"]["meetingParticipant"]>
    composites: {}
  }

  type MeetingParticipantGetPayload<S extends boolean | null | undefined | MeetingParticipantDefaultArgs> = $Result.GetResult<Prisma.$MeetingParticipantPayload, S>

  type MeetingParticipantCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MeetingParticipantFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MeetingParticipantCountAggregateInputType | true
    }

  export interface MeetingParticipantDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MeetingParticipant'], meta: { name: 'MeetingParticipant' } }
    /**
     * Find zero or one MeetingParticipant that matches the filter.
     * @param {MeetingParticipantFindUniqueArgs} args - Arguments to find a MeetingParticipant
     * @example
     * // Get one MeetingParticipant
     * const meetingParticipant = await prisma.meetingParticipant.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MeetingParticipantFindUniqueArgs>(args: SelectSubset<T, MeetingParticipantFindUniqueArgs<ExtArgs>>): Prisma__MeetingParticipantClient<$Result.GetResult<Prisma.$MeetingParticipantPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MeetingParticipant that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MeetingParticipantFindUniqueOrThrowArgs} args - Arguments to find a MeetingParticipant
     * @example
     * // Get one MeetingParticipant
     * const meetingParticipant = await prisma.meetingParticipant.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MeetingParticipantFindUniqueOrThrowArgs>(args: SelectSubset<T, MeetingParticipantFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MeetingParticipantClient<$Result.GetResult<Prisma.$MeetingParticipantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MeetingParticipant that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingParticipantFindFirstArgs} args - Arguments to find a MeetingParticipant
     * @example
     * // Get one MeetingParticipant
     * const meetingParticipant = await prisma.meetingParticipant.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MeetingParticipantFindFirstArgs>(args?: SelectSubset<T, MeetingParticipantFindFirstArgs<ExtArgs>>): Prisma__MeetingParticipantClient<$Result.GetResult<Prisma.$MeetingParticipantPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MeetingParticipant that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingParticipantFindFirstOrThrowArgs} args - Arguments to find a MeetingParticipant
     * @example
     * // Get one MeetingParticipant
     * const meetingParticipant = await prisma.meetingParticipant.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MeetingParticipantFindFirstOrThrowArgs>(args?: SelectSubset<T, MeetingParticipantFindFirstOrThrowArgs<ExtArgs>>): Prisma__MeetingParticipantClient<$Result.GetResult<Prisma.$MeetingParticipantPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MeetingParticipants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingParticipantFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MeetingParticipants
     * const meetingParticipants = await prisma.meetingParticipant.findMany()
     * 
     * // Get first 10 MeetingParticipants
     * const meetingParticipants = await prisma.meetingParticipant.findMany({ take: 10 })
     * 
     * // Only select the `meetingId`
     * const meetingParticipantWithMeetingIdOnly = await prisma.meetingParticipant.findMany({ select: { meetingId: true } })
     * 
     */
    findMany<T extends MeetingParticipantFindManyArgs>(args?: SelectSubset<T, MeetingParticipantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MeetingParticipantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MeetingParticipant.
     * @param {MeetingParticipantCreateArgs} args - Arguments to create a MeetingParticipant.
     * @example
     * // Create one MeetingParticipant
     * const MeetingParticipant = await prisma.meetingParticipant.create({
     *   data: {
     *     // ... data to create a MeetingParticipant
     *   }
     * })
     * 
     */
    create<T extends MeetingParticipantCreateArgs>(args: SelectSubset<T, MeetingParticipantCreateArgs<ExtArgs>>): Prisma__MeetingParticipantClient<$Result.GetResult<Prisma.$MeetingParticipantPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MeetingParticipants.
     * @param {MeetingParticipantCreateManyArgs} args - Arguments to create many MeetingParticipants.
     * @example
     * // Create many MeetingParticipants
     * const meetingParticipant = await prisma.meetingParticipant.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MeetingParticipantCreateManyArgs>(args?: SelectSubset<T, MeetingParticipantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MeetingParticipants and returns the data saved in the database.
     * @param {MeetingParticipantCreateManyAndReturnArgs} args - Arguments to create many MeetingParticipants.
     * @example
     * // Create many MeetingParticipants
     * const meetingParticipant = await prisma.meetingParticipant.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MeetingParticipants and only return the `meetingId`
     * const meetingParticipantWithMeetingIdOnly = await prisma.meetingParticipant.createManyAndReturn({
     *   select: { meetingId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MeetingParticipantCreateManyAndReturnArgs>(args?: SelectSubset<T, MeetingParticipantCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MeetingParticipantPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MeetingParticipant.
     * @param {MeetingParticipantDeleteArgs} args - Arguments to delete one MeetingParticipant.
     * @example
     * // Delete one MeetingParticipant
     * const MeetingParticipant = await prisma.meetingParticipant.delete({
     *   where: {
     *     // ... filter to delete one MeetingParticipant
     *   }
     * })
     * 
     */
    delete<T extends MeetingParticipantDeleteArgs>(args: SelectSubset<T, MeetingParticipantDeleteArgs<ExtArgs>>): Prisma__MeetingParticipantClient<$Result.GetResult<Prisma.$MeetingParticipantPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MeetingParticipant.
     * @param {MeetingParticipantUpdateArgs} args - Arguments to update one MeetingParticipant.
     * @example
     * // Update one MeetingParticipant
     * const meetingParticipant = await prisma.meetingParticipant.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MeetingParticipantUpdateArgs>(args: SelectSubset<T, MeetingParticipantUpdateArgs<ExtArgs>>): Prisma__MeetingParticipantClient<$Result.GetResult<Prisma.$MeetingParticipantPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MeetingParticipants.
     * @param {MeetingParticipantDeleteManyArgs} args - Arguments to filter MeetingParticipants to delete.
     * @example
     * // Delete a few MeetingParticipants
     * const { count } = await prisma.meetingParticipant.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MeetingParticipantDeleteManyArgs>(args?: SelectSubset<T, MeetingParticipantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MeetingParticipants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingParticipantUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MeetingParticipants
     * const meetingParticipant = await prisma.meetingParticipant.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MeetingParticipantUpdateManyArgs>(args: SelectSubset<T, MeetingParticipantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MeetingParticipants and returns the data updated in the database.
     * @param {MeetingParticipantUpdateManyAndReturnArgs} args - Arguments to update many MeetingParticipants.
     * @example
     * // Update many MeetingParticipants
     * const meetingParticipant = await prisma.meetingParticipant.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MeetingParticipants and only return the `meetingId`
     * const meetingParticipantWithMeetingIdOnly = await prisma.meetingParticipant.updateManyAndReturn({
     *   select: { meetingId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MeetingParticipantUpdateManyAndReturnArgs>(args: SelectSubset<T, MeetingParticipantUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MeetingParticipantPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MeetingParticipant.
     * @param {MeetingParticipantUpsertArgs} args - Arguments to update or create a MeetingParticipant.
     * @example
     * // Update or create a MeetingParticipant
     * const meetingParticipant = await prisma.meetingParticipant.upsert({
     *   create: {
     *     // ... data to create a MeetingParticipant
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MeetingParticipant we want to update
     *   }
     * })
     */
    upsert<T extends MeetingParticipantUpsertArgs>(args: SelectSubset<T, MeetingParticipantUpsertArgs<ExtArgs>>): Prisma__MeetingParticipantClient<$Result.GetResult<Prisma.$MeetingParticipantPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MeetingParticipants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingParticipantCountArgs} args - Arguments to filter MeetingParticipants to count.
     * @example
     * // Count the number of MeetingParticipants
     * const count = await prisma.meetingParticipant.count({
     *   where: {
     *     // ... the filter for the MeetingParticipants we want to count
     *   }
     * })
    **/
    count<T extends MeetingParticipantCountArgs>(
      args?: Subset<T, MeetingParticipantCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MeetingParticipantCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MeetingParticipant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingParticipantAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MeetingParticipantAggregateArgs>(args: Subset<T, MeetingParticipantAggregateArgs>): Prisma.PrismaPromise<GetMeetingParticipantAggregateType<T>>

    /**
     * Group by MeetingParticipant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingParticipantGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MeetingParticipantGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MeetingParticipantGroupByArgs['orderBy'] }
        : { orderBy?: MeetingParticipantGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MeetingParticipantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMeetingParticipantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MeetingParticipant model
   */
  readonly fields: MeetingParticipantFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MeetingParticipant.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MeetingParticipantClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    meeting<T extends MeetingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MeetingDefaultArgs<ExtArgs>>): Prisma__MeetingClient<$Result.GetResult<Prisma.$MeetingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MeetingParticipant model
   */
  interface MeetingParticipantFieldRefs {
    readonly meetingId: FieldRef<"MeetingParticipant", 'String'>
    readonly userId: FieldRef<"MeetingParticipant", 'String'>
  }
    

  // Custom InputTypes
  /**
   * MeetingParticipant findUnique
   */
  export type MeetingParticipantFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingParticipant
     */
    select?: MeetingParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MeetingParticipant
     */
    omit?: MeetingParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingParticipantInclude<ExtArgs> | null
    /**
     * Filter, which MeetingParticipant to fetch.
     */
    where: MeetingParticipantWhereUniqueInput
  }

  /**
   * MeetingParticipant findUniqueOrThrow
   */
  export type MeetingParticipantFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingParticipant
     */
    select?: MeetingParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MeetingParticipant
     */
    omit?: MeetingParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingParticipantInclude<ExtArgs> | null
    /**
     * Filter, which MeetingParticipant to fetch.
     */
    where: MeetingParticipantWhereUniqueInput
  }

  /**
   * MeetingParticipant findFirst
   */
  export type MeetingParticipantFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingParticipant
     */
    select?: MeetingParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MeetingParticipant
     */
    omit?: MeetingParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingParticipantInclude<ExtArgs> | null
    /**
     * Filter, which MeetingParticipant to fetch.
     */
    where?: MeetingParticipantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MeetingParticipants to fetch.
     */
    orderBy?: MeetingParticipantOrderByWithRelationInput | MeetingParticipantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MeetingParticipants.
     */
    cursor?: MeetingParticipantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MeetingParticipants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MeetingParticipants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MeetingParticipants.
     */
    distinct?: MeetingParticipantScalarFieldEnum | MeetingParticipantScalarFieldEnum[]
  }

  /**
   * MeetingParticipant findFirstOrThrow
   */
  export type MeetingParticipantFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingParticipant
     */
    select?: MeetingParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MeetingParticipant
     */
    omit?: MeetingParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingParticipantInclude<ExtArgs> | null
    /**
     * Filter, which MeetingParticipant to fetch.
     */
    where?: MeetingParticipantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MeetingParticipants to fetch.
     */
    orderBy?: MeetingParticipantOrderByWithRelationInput | MeetingParticipantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MeetingParticipants.
     */
    cursor?: MeetingParticipantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MeetingParticipants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MeetingParticipants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MeetingParticipants.
     */
    distinct?: MeetingParticipantScalarFieldEnum | MeetingParticipantScalarFieldEnum[]
  }

  /**
   * MeetingParticipant findMany
   */
  export type MeetingParticipantFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingParticipant
     */
    select?: MeetingParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MeetingParticipant
     */
    omit?: MeetingParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingParticipantInclude<ExtArgs> | null
    /**
     * Filter, which MeetingParticipants to fetch.
     */
    where?: MeetingParticipantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MeetingParticipants to fetch.
     */
    orderBy?: MeetingParticipantOrderByWithRelationInput | MeetingParticipantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MeetingParticipants.
     */
    cursor?: MeetingParticipantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MeetingParticipants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MeetingParticipants.
     */
    skip?: number
    distinct?: MeetingParticipantScalarFieldEnum | MeetingParticipantScalarFieldEnum[]
  }

  /**
   * MeetingParticipant create
   */
  export type MeetingParticipantCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingParticipant
     */
    select?: MeetingParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MeetingParticipant
     */
    omit?: MeetingParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingParticipantInclude<ExtArgs> | null
    /**
     * The data needed to create a MeetingParticipant.
     */
    data: XOR<MeetingParticipantCreateInput, MeetingParticipantUncheckedCreateInput>
  }

  /**
   * MeetingParticipant createMany
   */
  export type MeetingParticipantCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MeetingParticipants.
     */
    data: MeetingParticipantCreateManyInput | MeetingParticipantCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MeetingParticipant createManyAndReturn
   */
  export type MeetingParticipantCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingParticipant
     */
    select?: MeetingParticipantSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MeetingParticipant
     */
    omit?: MeetingParticipantOmit<ExtArgs> | null
    /**
     * The data used to create many MeetingParticipants.
     */
    data: MeetingParticipantCreateManyInput | MeetingParticipantCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingParticipantIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MeetingParticipant update
   */
  export type MeetingParticipantUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingParticipant
     */
    select?: MeetingParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MeetingParticipant
     */
    omit?: MeetingParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingParticipantInclude<ExtArgs> | null
    /**
     * The data needed to update a MeetingParticipant.
     */
    data: XOR<MeetingParticipantUpdateInput, MeetingParticipantUncheckedUpdateInput>
    /**
     * Choose, which MeetingParticipant to update.
     */
    where: MeetingParticipantWhereUniqueInput
  }

  /**
   * MeetingParticipant updateMany
   */
  export type MeetingParticipantUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MeetingParticipants.
     */
    data: XOR<MeetingParticipantUpdateManyMutationInput, MeetingParticipantUncheckedUpdateManyInput>
    /**
     * Filter which MeetingParticipants to update
     */
    where?: MeetingParticipantWhereInput
    /**
     * Limit how many MeetingParticipants to update.
     */
    limit?: number
  }

  /**
   * MeetingParticipant updateManyAndReturn
   */
  export type MeetingParticipantUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingParticipant
     */
    select?: MeetingParticipantSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MeetingParticipant
     */
    omit?: MeetingParticipantOmit<ExtArgs> | null
    /**
     * The data used to update MeetingParticipants.
     */
    data: XOR<MeetingParticipantUpdateManyMutationInput, MeetingParticipantUncheckedUpdateManyInput>
    /**
     * Filter which MeetingParticipants to update
     */
    where?: MeetingParticipantWhereInput
    /**
     * Limit how many MeetingParticipants to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingParticipantIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MeetingParticipant upsert
   */
  export type MeetingParticipantUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingParticipant
     */
    select?: MeetingParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MeetingParticipant
     */
    omit?: MeetingParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingParticipantInclude<ExtArgs> | null
    /**
     * The filter to search for the MeetingParticipant to update in case it exists.
     */
    where: MeetingParticipantWhereUniqueInput
    /**
     * In case the MeetingParticipant found by the `where` argument doesn't exist, create a new MeetingParticipant with this data.
     */
    create: XOR<MeetingParticipantCreateInput, MeetingParticipantUncheckedCreateInput>
    /**
     * In case the MeetingParticipant was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MeetingParticipantUpdateInput, MeetingParticipantUncheckedUpdateInput>
  }

  /**
   * MeetingParticipant delete
   */
  export type MeetingParticipantDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingParticipant
     */
    select?: MeetingParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MeetingParticipant
     */
    omit?: MeetingParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingParticipantInclude<ExtArgs> | null
    /**
     * Filter which MeetingParticipant to delete.
     */
    where: MeetingParticipantWhereUniqueInput
  }

  /**
   * MeetingParticipant deleteMany
   */
  export type MeetingParticipantDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MeetingParticipants to delete
     */
    where?: MeetingParticipantWhereInput
    /**
     * Limit how many MeetingParticipants to delete.
     */
    limit?: number
  }

  /**
   * MeetingParticipant without action
   */
  export type MeetingParticipantDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingParticipant
     */
    select?: MeetingParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MeetingParticipant
     */
    omit?: MeetingParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingParticipantInclude<ExtArgs> | null
  }


  /**
   * Model MeetingDocument
   */

  export type AggregateMeetingDocument = {
    _count: MeetingDocumentCountAggregateOutputType | null
    _min: MeetingDocumentMinAggregateOutputType | null
    _max: MeetingDocumentMaxAggregateOutputType | null
  }

  export type MeetingDocumentMinAggregateOutputType = {
    id: string | null
    meetingId: string | null
    namaFile: string | null
    pathFile: string | null
    tipeFile: string | null
    uploadedAt: Date | null
  }

  export type MeetingDocumentMaxAggregateOutputType = {
    id: string | null
    meetingId: string | null
    namaFile: string | null
    pathFile: string | null
    tipeFile: string | null
    uploadedAt: Date | null
  }

  export type MeetingDocumentCountAggregateOutputType = {
    id: number
    meetingId: number
    namaFile: number
    pathFile: number
    tipeFile: number
    uploadedAt: number
    _all: number
  }


  export type MeetingDocumentMinAggregateInputType = {
    id?: true
    meetingId?: true
    namaFile?: true
    pathFile?: true
    tipeFile?: true
    uploadedAt?: true
  }

  export type MeetingDocumentMaxAggregateInputType = {
    id?: true
    meetingId?: true
    namaFile?: true
    pathFile?: true
    tipeFile?: true
    uploadedAt?: true
  }

  export type MeetingDocumentCountAggregateInputType = {
    id?: true
    meetingId?: true
    namaFile?: true
    pathFile?: true
    tipeFile?: true
    uploadedAt?: true
    _all?: true
  }

  export type MeetingDocumentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MeetingDocument to aggregate.
     */
    where?: MeetingDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MeetingDocuments to fetch.
     */
    orderBy?: MeetingDocumentOrderByWithRelationInput | MeetingDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MeetingDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MeetingDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MeetingDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MeetingDocuments
    **/
    _count?: true | MeetingDocumentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MeetingDocumentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MeetingDocumentMaxAggregateInputType
  }

  export type GetMeetingDocumentAggregateType<T extends MeetingDocumentAggregateArgs> = {
        [P in keyof T & keyof AggregateMeetingDocument]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMeetingDocument[P]>
      : GetScalarType<T[P], AggregateMeetingDocument[P]>
  }




  export type MeetingDocumentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MeetingDocumentWhereInput
    orderBy?: MeetingDocumentOrderByWithAggregationInput | MeetingDocumentOrderByWithAggregationInput[]
    by: MeetingDocumentScalarFieldEnum[] | MeetingDocumentScalarFieldEnum
    having?: MeetingDocumentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MeetingDocumentCountAggregateInputType | true
    _min?: MeetingDocumentMinAggregateInputType
    _max?: MeetingDocumentMaxAggregateInputType
  }

  export type MeetingDocumentGroupByOutputType = {
    id: string
    meetingId: string
    namaFile: string
    pathFile: string
    tipeFile: string
    uploadedAt: Date
    _count: MeetingDocumentCountAggregateOutputType | null
    _min: MeetingDocumentMinAggregateOutputType | null
    _max: MeetingDocumentMaxAggregateOutputType | null
  }

  type GetMeetingDocumentGroupByPayload<T extends MeetingDocumentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MeetingDocumentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MeetingDocumentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MeetingDocumentGroupByOutputType[P]>
            : GetScalarType<T[P], MeetingDocumentGroupByOutputType[P]>
        }
      >
    >


  export type MeetingDocumentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    meetingId?: boolean
    namaFile?: boolean
    pathFile?: boolean
    tipeFile?: boolean
    uploadedAt?: boolean
    meeting?: boolean | MeetingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["meetingDocument"]>

  export type MeetingDocumentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    meetingId?: boolean
    namaFile?: boolean
    pathFile?: boolean
    tipeFile?: boolean
    uploadedAt?: boolean
    meeting?: boolean | MeetingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["meetingDocument"]>

  export type MeetingDocumentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    meetingId?: boolean
    namaFile?: boolean
    pathFile?: boolean
    tipeFile?: boolean
    uploadedAt?: boolean
    meeting?: boolean | MeetingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["meetingDocument"]>

  export type MeetingDocumentSelectScalar = {
    id?: boolean
    meetingId?: boolean
    namaFile?: boolean
    pathFile?: boolean
    tipeFile?: boolean
    uploadedAt?: boolean
  }

  export type MeetingDocumentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "meetingId" | "namaFile" | "pathFile" | "tipeFile" | "uploadedAt", ExtArgs["result"]["meetingDocument"]>
  export type MeetingDocumentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meeting?: boolean | MeetingDefaultArgs<ExtArgs>
  }
  export type MeetingDocumentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meeting?: boolean | MeetingDefaultArgs<ExtArgs>
  }
  export type MeetingDocumentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meeting?: boolean | MeetingDefaultArgs<ExtArgs>
  }

  export type $MeetingDocumentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MeetingDocument"
    objects: {
      meeting: Prisma.$MeetingPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      meetingId: string
      namaFile: string
      pathFile: string
      tipeFile: string
      uploadedAt: Date
    }, ExtArgs["result"]["meetingDocument"]>
    composites: {}
  }

  type MeetingDocumentGetPayload<S extends boolean | null | undefined | MeetingDocumentDefaultArgs> = $Result.GetResult<Prisma.$MeetingDocumentPayload, S>

  type MeetingDocumentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MeetingDocumentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MeetingDocumentCountAggregateInputType | true
    }

  export interface MeetingDocumentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MeetingDocument'], meta: { name: 'MeetingDocument' } }
    /**
     * Find zero or one MeetingDocument that matches the filter.
     * @param {MeetingDocumentFindUniqueArgs} args - Arguments to find a MeetingDocument
     * @example
     * // Get one MeetingDocument
     * const meetingDocument = await prisma.meetingDocument.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MeetingDocumentFindUniqueArgs>(args: SelectSubset<T, MeetingDocumentFindUniqueArgs<ExtArgs>>): Prisma__MeetingDocumentClient<$Result.GetResult<Prisma.$MeetingDocumentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MeetingDocument that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MeetingDocumentFindUniqueOrThrowArgs} args - Arguments to find a MeetingDocument
     * @example
     * // Get one MeetingDocument
     * const meetingDocument = await prisma.meetingDocument.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MeetingDocumentFindUniqueOrThrowArgs>(args: SelectSubset<T, MeetingDocumentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MeetingDocumentClient<$Result.GetResult<Prisma.$MeetingDocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MeetingDocument that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingDocumentFindFirstArgs} args - Arguments to find a MeetingDocument
     * @example
     * // Get one MeetingDocument
     * const meetingDocument = await prisma.meetingDocument.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MeetingDocumentFindFirstArgs>(args?: SelectSubset<T, MeetingDocumentFindFirstArgs<ExtArgs>>): Prisma__MeetingDocumentClient<$Result.GetResult<Prisma.$MeetingDocumentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MeetingDocument that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingDocumentFindFirstOrThrowArgs} args - Arguments to find a MeetingDocument
     * @example
     * // Get one MeetingDocument
     * const meetingDocument = await prisma.meetingDocument.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MeetingDocumentFindFirstOrThrowArgs>(args?: SelectSubset<T, MeetingDocumentFindFirstOrThrowArgs<ExtArgs>>): Prisma__MeetingDocumentClient<$Result.GetResult<Prisma.$MeetingDocumentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MeetingDocuments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingDocumentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MeetingDocuments
     * const meetingDocuments = await prisma.meetingDocument.findMany()
     * 
     * // Get first 10 MeetingDocuments
     * const meetingDocuments = await prisma.meetingDocument.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const meetingDocumentWithIdOnly = await prisma.meetingDocument.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MeetingDocumentFindManyArgs>(args?: SelectSubset<T, MeetingDocumentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MeetingDocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MeetingDocument.
     * @param {MeetingDocumentCreateArgs} args - Arguments to create a MeetingDocument.
     * @example
     * // Create one MeetingDocument
     * const MeetingDocument = await prisma.meetingDocument.create({
     *   data: {
     *     // ... data to create a MeetingDocument
     *   }
     * })
     * 
     */
    create<T extends MeetingDocumentCreateArgs>(args: SelectSubset<T, MeetingDocumentCreateArgs<ExtArgs>>): Prisma__MeetingDocumentClient<$Result.GetResult<Prisma.$MeetingDocumentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MeetingDocuments.
     * @param {MeetingDocumentCreateManyArgs} args - Arguments to create many MeetingDocuments.
     * @example
     * // Create many MeetingDocuments
     * const meetingDocument = await prisma.meetingDocument.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MeetingDocumentCreateManyArgs>(args?: SelectSubset<T, MeetingDocumentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MeetingDocuments and returns the data saved in the database.
     * @param {MeetingDocumentCreateManyAndReturnArgs} args - Arguments to create many MeetingDocuments.
     * @example
     * // Create many MeetingDocuments
     * const meetingDocument = await prisma.meetingDocument.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MeetingDocuments and only return the `id`
     * const meetingDocumentWithIdOnly = await prisma.meetingDocument.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MeetingDocumentCreateManyAndReturnArgs>(args?: SelectSubset<T, MeetingDocumentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MeetingDocumentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MeetingDocument.
     * @param {MeetingDocumentDeleteArgs} args - Arguments to delete one MeetingDocument.
     * @example
     * // Delete one MeetingDocument
     * const MeetingDocument = await prisma.meetingDocument.delete({
     *   where: {
     *     // ... filter to delete one MeetingDocument
     *   }
     * })
     * 
     */
    delete<T extends MeetingDocumentDeleteArgs>(args: SelectSubset<T, MeetingDocumentDeleteArgs<ExtArgs>>): Prisma__MeetingDocumentClient<$Result.GetResult<Prisma.$MeetingDocumentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MeetingDocument.
     * @param {MeetingDocumentUpdateArgs} args - Arguments to update one MeetingDocument.
     * @example
     * // Update one MeetingDocument
     * const meetingDocument = await prisma.meetingDocument.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MeetingDocumentUpdateArgs>(args: SelectSubset<T, MeetingDocumentUpdateArgs<ExtArgs>>): Prisma__MeetingDocumentClient<$Result.GetResult<Prisma.$MeetingDocumentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MeetingDocuments.
     * @param {MeetingDocumentDeleteManyArgs} args - Arguments to filter MeetingDocuments to delete.
     * @example
     * // Delete a few MeetingDocuments
     * const { count } = await prisma.meetingDocument.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MeetingDocumentDeleteManyArgs>(args?: SelectSubset<T, MeetingDocumentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MeetingDocuments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingDocumentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MeetingDocuments
     * const meetingDocument = await prisma.meetingDocument.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MeetingDocumentUpdateManyArgs>(args: SelectSubset<T, MeetingDocumentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MeetingDocuments and returns the data updated in the database.
     * @param {MeetingDocumentUpdateManyAndReturnArgs} args - Arguments to update many MeetingDocuments.
     * @example
     * // Update many MeetingDocuments
     * const meetingDocument = await prisma.meetingDocument.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MeetingDocuments and only return the `id`
     * const meetingDocumentWithIdOnly = await prisma.meetingDocument.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MeetingDocumentUpdateManyAndReturnArgs>(args: SelectSubset<T, MeetingDocumentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MeetingDocumentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MeetingDocument.
     * @param {MeetingDocumentUpsertArgs} args - Arguments to update or create a MeetingDocument.
     * @example
     * // Update or create a MeetingDocument
     * const meetingDocument = await prisma.meetingDocument.upsert({
     *   create: {
     *     // ... data to create a MeetingDocument
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MeetingDocument we want to update
     *   }
     * })
     */
    upsert<T extends MeetingDocumentUpsertArgs>(args: SelectSubset<T, MeetingDocumentUpsertArgs<ExtArgs>>): Prisma__MeetingDocumentClient<$Result.GetResult<Prisma.$MeetingDocumentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MeetingDocuments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingDocumentCountArgs} args - Arguments to filter MeetingDocuments to count.
     * @example
     * // Count the number of MeetingDocuments
     * const count = await prisma.meetingDocument.count({
     *   where: {
     *     // ... the filter for the MeetingDocuments we want to count
     *   }
     * })
    **/
    count<T extends MeetingDocumentCountArgs>(
      args?: Subset<T, MeetingDocumentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MeetingDocumentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MeetingDocument.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingDocumentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MeetingDocumentAggregateArgs>(args: Subset<T, MeetingDocumentAggregateArgs>): Prisma.PrismaPromise<GetMeetingDocumentAggregateType<T>>

    /**
     * Group by MeetingDocument.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingDocumentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MeetingDocumentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MeetingDocumentGroupByArgs['orderBy'] }
        : { orderBy?: MeetingDocumentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MeetingDocumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMeetingDocumentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MeetingDocument model
   */
  readonly fields: MeetingDocumentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MeetingDocument.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MeetingDocumentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    meeting<T extends MeetingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MeetingDefaultArgs<ExtArgs>>): Prisma__MeetingClient<$Result.GetResult<Prisma.$MeetingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MeetingDocument model
   */
  interface MeetingDocumentFieldRefs {
    readonly id: FieldRef<"MeetingDocument", 'String'>
    readonly meetingId: FieldRef<"MeetingDocument", 'String'>
    readonly namaFile: FieldRef<"MeetingDocument", 'String'>
    readonly pathFile: FieldRef<"MeetingDocument", 'String'>
    readonly tipeFile: FieldRef<"MeetingDocument", 'String'>
    readonly uploadedAt: FieldRef<"MeetingDocument", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MeetingDocument findUnique
   */
  export type MeetingDocumentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingDocument
     */
    select?: MeetingDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MeetingDocument
     */
    omit?: MeetingDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingDocumentInclude<ExtArgs> | null
    /**
     * Filter, which MeetingDocument to fetch.
     */
    where: MeetingDocumentWhereUniqueInput
  }

  /**
   * MeetingDocument findUniqueOrThrow
   */
  export type MeetingDocumentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingDocument
     */
    select?: MeetingDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MeetingDocument
     */
    omit?: MeetingDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingDocumentInclude<ExtArgs> | null
    /**
     * Filter, which MeetingDocument to fetch.
     */
    where: MeetingDocumentWhereUniqueInput
  }

  /**
   * MeetingDocument findFirst
   */
  export type MeetingDocumentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingDocument
     */
    select?: MeetingDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MeetingDocument
     */
    omit?: MeetingDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingDocumentInclude<ExtArgs> | null
    /**
     * Filter, which MeetingDocument to fetch.
     */
    where?: MeetingDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MeetingDocuments to fetch.
     */
    orderBy?: MeetingDocumentOrderByWithRelationInput | MeetingDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MeetingDocuments.
     */
    cursor?: MeetingDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MeetingDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MeetingDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MeetingDocuments.
     */
    distinct?: MeetingDocumentScalarFieldEnum | MeetingDocumentScalarFieldEnum[]
  }

  /**
   * MeetingDocument findFirstOrThrow
   */
  export type MeetingDocumentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingDocument
     */
    select?: MeetingDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MeetingDocument
     */
    omit?: MeetingDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingDocumentInclude<ExtArgs> | null
    /**
     * Filter, which MeetingDocument to fetch.
     */
    where?: MeetingDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MeetingDocuments to fetch.
     */
    orderBy?: MeetingDocumentOrderByWithRelationInput | MeetingDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MeetingDocuments.
     */
    cursor?: MeetingDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MeetingDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MeetingDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MeetingDocuments.
     */
    distinct?: MeetingDocumentScalarFieldEnum | MeetingDocumentScalarFieldEnum[]
  }

  /**
   * MeetingDocument findMany
   */
  export type MeetingDocumentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingDocument
     */
    select?: MeetingDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MeetingDocument
     */
    omit?: MeetingDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingDocumentInclude<ExtArgs> | null
    /**
     * Filter, which MeetingDocuments to fetch.
     */
    where?: MeetingDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MeetingDocuments to fetch.
     */
    orderBy?: MeetingDocumentOrderByWithRelationInput | MeetingDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MeetingDocuments.
     */
    cursor?: MeetingDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MeetingDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MeetingDocuments.
     */
    skip?: number
    distinct?: MeetingDocumentScalarFieldEnum | MeetingDocumentScalarFieldEnum[]
  }

  /**
   * MeetingDocument create
   */
  export type MeetingDocumentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingDocument
     */
    select?: MeetingDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MeetingDocument
     */
    omit?: MeetingDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingDocumentInclude<ExtArgs> | null
    /**
     * The data needed to create a MeetingDocument.
     */
    data: XOR<MeetingDocumentCreateInput, MeetingDocumentUncheckedCreateInput>
  }

  /**
   * MeetingDocument createMany
   */
  export type MeetingDocumentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MeetingDocuments.
     */
    data: MeetingDocumentCreateManyInput | MeetingDocumentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MeetingDocument createManyAndReturn
   */
  export type MeetingDocumentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingDocument
     */
    select?: MeetingDocumentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MeetingDocument
     */
    omit?: MeetingDocumentOmit<ExtArgs> | null
    /**
     * The data used to create many MeetingDocuments.
     */
    data: MeetingDocumentCreateManyInput | MeetingDocumentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingDocumentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MeetingDocument update
   */
  export type MeetingDocumentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingDocument
     */
    select?: MeetingDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MeetingDocument
     */
    omit?: MeetingDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingDocumentInclude<ExtArgs> | null
    /**
     * The data needed to update a MeetingDocument.
     */
    data: XOR<MeetingDocumentUpdateInput, MeetingDocumentUncheckedUpdateInput>
    /**
     * Choose, which MeetingDocument to update.
     */
    where: MeetingDocumentWhereUniqueInput
  }

  /**
   * MeetingDocument updateMany
   */
  export type MeetingDocumentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MeetingDocuments.
     */
    data: XOR<MeetingDocumentUpdateManyMutationInput, MeetingDocumentUncheckedUpdateManyInput>
    /**
     * Filter which MeetingDocuments to update
     */
    where?: MeetingDocumentWhereInput
    /**
     * Limit how many MeetingDocuments to update.
     */
    limit?: number
  }

  /**
   * MeetingDocument updateManyAndReturn
   */
  export type MeetingDocumentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingDocument
     */
    select?: MeetingDocumentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MeetingDocument
     */
    omit?: MeetingDocumentOmit<ExtArgs> | null
    /**
     * The data used to update MeetingDocuments.
     */
    data: XOR<MeetingDocumentUpdateManyMutationInput, MeetingDocumentUncheckedUpdateManyInput>
    /**
     * Filter which MeetingDocuments to update
     */
    where?: MeetingDocumentWhereInput
    /**
     * Limit how many MeetingDocuments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingDocumentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MeetingDocument upsert
   */
  export type MeetingDocumentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingDocument
     */
    select?: MeetingDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MeetingDocument
     */
    omit?: MeetingDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingDocumentInclude<ExtArgs> | null
    /**
     * The filter to search for the MeetingDocument to update in case it exists.
     */
    where: MeetingDocumentWhereUniqueInput
    /**
     * In case the MeetingDocument found by the `where` argument doesn't exist, create a new MeetingDocument with this data.
     */
    create: XOR<MeetingDocumentCreateInput, MeetingDocumentUncheckedCreateInput>
    /**
     * In case the MeetingDocument was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MeetingDocumentUpdateInput, MeetingDocumentUncheckedUpdateInput>
  }

  /**
   * MeetingDocument delete
   */
  export type MeetingDocumentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingDocument
     */
    select?: MeetingDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MeetingDocument
     */
    omit?: MeetingDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingDocumentInclude<ExtArgs> | null
    /**
     * Filter which MeetingDocument to delete.
     */
    where: MeetingDocumentWhereUniqueInput
  }

  /**
   * MeetingDocument deleteMany
   */
  export type MeetingDocumentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MeetingDocuments to delete
     */
    where?: MeetingDocumentWhereInput
    /**
     * Limit how many MeetingDocuments to delete.
     */
    limit?: number
  }

  /**
   * MeetingDocument without action
   */
  export type MeetingDocumentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingDocument
     */
    select?: MeetingDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MeetingDocument
     */
    omit?: MeetingDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingDocumentInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    nama: 'nama',
    role: 'role',
    tandaTangan: 'tandaTangan',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const MeetingScalarFieldEnum: {
    id: 'id',
    namaRapat: 'namaRapat',
    startDateTime: 'startDateTime',
    endDateTime: 'endDateTime',
    agenda: 'agenda',
    notulensiRapat: 'notulensiRapat',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MeetingScalarFieldEnum = (typeof MeetingScalarFieldEnum)[keyof typeof MeetingScalarFieldEnum]


  export const MeetingParticipantScalarFieldEnum: {
    meetingId: 'meetingId',
    userId: 'userId'
  };

  export type MeetingParticipantScalarFieldEnum = (typeof MeetingParticipantScalarFieldEnum)[keyof typeof MeetingParticipantScalarFieldEnum]


  export const MeetingDocumentScalarFieldEnum: {
    id: 'id',
    meetingId: 'meetingId',
    namaFile: 'namaFile',
    pathFile: 'pathFile',
    tipeFile: 'tipeFile',
    uploadedAt: 'uploadedAt'
  };

  export type MeetingDocumentScalarFieldEnum = (typeof MeetingDocumentScalarFieldEnum)[keyof typeof MeetingDocumentScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Status'
   */
  export type EnumStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Status'>
    


  /**
   * Reference to a field of type 'Status[]'
   */
  export type ListEnumStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Status[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    nama?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    tandaTangan?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    meetings?: MeetingParticipantListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    nama?: SortOrder
    role?: SortOrder
    tandaTangan?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    meetings?: MeetingParticipantOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    nama?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    tandaTangan?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    meetings?: MeetingParticipantListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    nama?: SortOrder
    role?: SortOrder
    tandaTangan?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    nama?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    tandaTangan?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type MeetingWhereInput = {
    AND?: MeetingWhereInput | MeetingWhereInput[]
    OR?: MeetingWhereInput[]
    NOT?: MeetingWhereInput | MeetingWhereInput[]
    id?: StringFilter<"Meeting"> | string
    namaRapat?: StringFilter<"Meeting"> | string
    startDateTime?: DateTimeFilter<"Meeting"> | Date | string
    endDateTime?: DateTimeFilter<"Meeting"> | Date | string
    agenda?: StringNullableFilter<"Meeting"> | string | null
    notulensiRapat?: StringNullableFilter<"Meeting"> | string | null
    status?: EnumStatusFilter<"Meeting"> | $Enums.Status
    createdAt?: DateTimeFilter<"Meeting"> | Date | string
    updatedAt?: DateTimeFilter<"Meeting"> | Date | string
    participants?: MeetingParticipantListRelationFilter
    documents?: MeetingDocumentListRelationFilter
  }

  export type MeetingOrderByWithRelationInput = {
    id?: SortOrder
    namaRapat?: SortOrder
    startDateTime?: SortOrder
    endDateTime?: SortOrder
    agenda?: SortOrderInput | SortOrder
    notulensiRapat?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    participants?: MeetingParticipantOrderByRelationAggregateInput
    documents?: MeetingDocumentOrderByRelationAggregateInput
  }

  export type MeetingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MeetingWhereInput | MeetingWhereInput[]
    OR?: MeetingWhereInput[]
    NOT?: MeetingWhereInput | MeetingWhereInput[]
    namaRapat?: StringFilter<"Meeting"> | string
    startDateTime?: DateTimeFilter<"Meeting"> | Date | string
    endDateTime?: DateTimeFilter<"Meeting"> | Date | string
    agenda?: StringNullableFilter<"Meeting"> | string | null
    notulensiRapat?: StringNullableFilter<"Meeting"> | string | null
    status?: EnumStatusFilter<"Meeting"> | $Enums.Status
    createdAt?: DateTimeFilter<"Meeting"> | Date | string
    updatedAt?: DateTimeFilter<"Meeting"> | Date | string
    participants?: MeetingParticipantListRelationFilter
    documents?: MeetingDocumentListRelationFilter
  }, "id">

  export type MeetingOrderByWithAggregationInput = {
    id?: SortOrder
    namaRapat?: SortOrder
    startDateTime?: SortOrder
    endDateTime?: SortOrder
    agenda?: SortOrderInput | SortOrder
    notulensiRapat?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MeetingCountOrderByAggregateInput
    _max?: MeetingMaxOrderByAggregateInput
    _min?: MeetingMinOrderByAggregateInput
  }

  export type MeetingScalarWhereWithAggregatesInput = {
    AND?: MeetingScalarWhereWithAggregatesInput | MeetingScalarWhereWithAggregatesInput[]
    OR?: MeetingScalarWhereWithAggregatesInput[]
    NOT?: MeetingScalarWhereWithAggregatesInput | MeetingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Meeting"> | string
    namaRapat?: StringWithAggregatesFilter<"Meeting"> | string
    startDateTime?: DateTimeWithAggregatesFilter<"Meeting"> | Date | string
    endDateTime?: DateTimeWithAggregatesFilter<"Meeting"> | Date | string
    agenda?: StringNullableWithAggregatesFilter<"Meeting"> | string | null
    notulensiRapat?: StringNullableWithAggregatesFilter<"Meeting"> | string | null
    status?: EnumStatusWithAggregatesFilter<"Meeting"> | $Enums.Status
    createdAt?: DateTimeWithAggregatesFilter<"Meeting"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Meeting"> | Date | string
  }

  export type MeetingParticipantWhereInput = {
    AND?: MeetingParticipantWhereInput | MeetingParticipantWhereInput[]
    OR?: MeetingParticipantWhereInput[]
    NOT?: MeetingParticipantWhereInput | MeetingParticipantWhereInput[]
    meetingId?: StringFilter<"MeetingParticipant"> | string
    userId?: StringFilter<"MeetingParticipant"> | string
    meeting?: XOR<MeetingScalarRelationFilter, MeetingWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type MeetingParticipantOrderByWithRelationInput = {
    meetingId?: SortOrder
    userId?: SortOrder
    meeting?: MeetingOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type MeetingParticipantWhereUniqueInput = Prisma.AtLeast<{
    meetingId_userId?: MeetingParticipantMeetingIdUserIdCompoundUniqueInput
    AND?: MeetingParticipantWhereInput | MeetingParticipantWhereInput[]
    OR?: MeetingParticipantWhereInput[]
    NOT?: MeetingParticipantWhereInput | MeetingParticipantWhereInput[]
    meetingId?: StringFilter<"MeetingParticipant"> | string
    userId?: StringFilter<"MeetingParticipant"> | string
    meeting?: XOR<MeetingScalarRelationFilter, MeetingWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "meetingId_userId">

  export type MeetingParticipantOrderByWithAggregationInput = {
    meetingId?: SortOrder
    userId?: SortOrder
    _count?: MeetingParticipantCountOrderByAggregateInput
    _max?: MeetingParticipantMaxOrderByAggregateInput
    _min?: MeetingParticipantMinOrderByAggregateInput
  }

  export type MeetingParticipantScalarWhereWithAggregatesInput = {
    AND?: MeetingParticipantScalarWhereWithAggregatesInput | MeetingParticipantScalarWhereWithAggregatesInput[]
    OR?: MeetingParticipantScalarWhereWithAggregatesInput[]
    NOT?: MeetingParticipantScalarWhereWithAggregatesInput | MeetingParticipantScalarWhereWithAggregatesInput[]
    meetingId?: StringWithAggregatesFilter<"MeetingParticipant"> | string
    userId?: StringWithAggregatesFilter<"MeetingParticipant"> | string
  }

  export type MeetingDocumentWhereInput = {
    AND?: MeetingDocumentWhereInput | MeetingDocumentWhereInput[]
    OR?: MeetingDocumentWhereInput[]
    NOT?: MeetingDocumentWhereInput | MeetingDocumentWhereInput[]
    id?: StringFilter<"MeetingDocument"> | string
    meetingId?: StringFilter<"MeetingDocument"> | string
    namaFile?: StringFilter<"MeetingDocument"> | string
    pathFile?: StringFilter<"MeetingDocument"> | string
    tipeFile?: StringFilter<"MeetingDocument"> | string
    uploadedAt?: DateTimeFilter<"MeetingDocument"> | Date | string
    meeting?: XOR<MeetingScalarRelationFilter, MeetingWhereInput>
  }

  export type MeetingDocumentOrderByWithRelationInput = {
    id?: SortOrder
    meetingId?: SortOrder
    namaFile?: SortOrder
    pathFile?: SortOrder
    tipeFile?: SortOrder
    uploadedAt?: SortOrder
    meeting?: MeetingOrderByWithRelationInput
  }

  export type MeetingDocumentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MeetingDocumentWhereInput | MeetingDocumentWhereInput[]
    OR?: MeetingDocumentWhereInput[]
    NOT?: MeetingDocumentWhereInput | MeetingDocumentWhereInput[]
    meetingId?: StringFilter<"MeetingDocument"> | string
    namaFile?: StringFilter<"MeetingDocument"> | string
    pathFile?: StringFilter<"MeetingDocument"> | string
    tipeFile?: StringFilter<"MeetingDocument"> | string
    uploadedAt?: DateTimeFilter<"MeetingDocument"> | Date | string
    meeting?: XOR<MeetingScalarRelationFilter, MeetingWhereInput>
  }, "id">

  export type MeetingDocumentOrderByWithAggregationInput = {
    id?: SortOrder
    meetingId?: SortOrder
    namaFile?: SortOrder
    pathFile?: SortOrder
    tipeFile?: SortOrder
    uploadedAt?: SortOrder
    _count?: MeetingDocumentCountOrderByAggregateInput
    _max?: MeetingDocumentMaxOrderByAggregateInput
    _min?: MeetingDocumentMinOrderByAggregateInput
  }

  export type MeetingDocumentScalarWhereWithAggregatesInput = {
    AND?: MeetingDocumentScalarWhereWithAggregatesInput | MeetingDocumentScalarWhereWithAggregatesInput[]
    OR?: MeetingDocumentScalarWhereWithAggregatesInput[]
    NOT?: MeetingDocumentScalarWhereWithAggregatesInput | MeetingDocumentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MeetingDocument"> | string
    meetingId?: StringWithAggregatesFilter<"MeetingDocument"> | string
    namaFile?: StringWithAggregatesFilter<"MeetingDocument"> | string
    pathFile?: StringWithAggregatesFilter<"MeetingDocument"> | string
    tipeFile?: StringWithAggregatesFilter<"MeetingDocument"> | string
    uploadedAt?: DateTimeWithAggregatesFilter<"MeetingDocument"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password: string
    nama: string
    role?: $Enums.Role
    tandaTangan?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    meetings?: MeetingParticipantCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    nama: string
    role?: $Enums.Role
    tandaTangan?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    meetings?: MeetingParticipantUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    tandaTangan?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    meetings?: MeetingParticipantUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    tandaTangan?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    meetings?: MeetingParticipantUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password: string
    nama: string
    role?: $Enums.Role
    tandaTangan?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    tandaTangan?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    tandaTangan?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MeetingCreateInput = {
    id?: string
    namaRapat: string
    startDateTime: Date | string
    endDateTime: Date | string
    agenda?: string | null
    notulensiRapat?: string | null
    status?: $Enums.Status
    createdAt?: Date | string
    updatedAt?: Date | string
    participants?: MeetingParticipantCreateNestedManyWithoutMeetingInput
    documents?: MeetingDocumentCreateNestedManyWithoutMeetingInput
  }

  export type MeetingUncheckedCreateInput = {
    id?: string
    namaRapat: string
    startDateTime: Date | string
    endDateTime: Date | string
    agenda?: string | null
    notulensiRapat?: string | null
    status?: $Enums.Status
    createdAt?: Date | string
    updatedAt?: Date | string
    participants?: MeetingParticipantUncheckedCreateNestedManyWithoutMeetingInput
    documents?: MeetingDocumentUncheckedCreateNestedManyWithoutMeetingInput
  }

  export type MeetingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    namaRapat?: StringFieldUpdateOperationsInput | string
    startDateTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endDateTime?: DateTimeFieldUpdateOperationsInput | Date | string
    agenda?: NullableStringFieldUpdateOperationsInput | string | null
    notulensiRapat?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    participants?: MeetingParticipantUpdateManyWithoutMeetingNestedInput
    documents?: MeetingDocumentUpdateManyWithoutMeetingNestedInput
  }

  export type MeetingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    namaRapat?: StringFieldUpdateOperationsInput | string
    startDateTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endDateTime?: DateTimeFieldUpdateOperationsInput | Date | string
    agenda?: NullableStringFieldUpdateOperationsInput | string | null
    notulensiRapat?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    participants?: MeetingParticipantUncheckedUpdateManyWithoutMeetingNestedInput
    documents?: MeetingDocumentUncheckedUpdateManyWithoutMeetingNestedInput
  }

  export type MeetingCreateManyInput = {
    id?: string
    namaRapat: string
    startDateTime: Date | string
    endDateTime: Date | string
    agenda?: string | null
    notulensiRapat?: string | null
    status?: $Enums.Status
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MeetingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    namaRapat?: StringFieldUpdateOperationsInput | string
    startDateTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endDateTime?: DateTimeFieldUpdateOperationsInput | Date | string
    agenda?: NullableStringFieldUpdateOperationsInput | string | null
    notulensiRapat?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MeetingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    namaRapat?: StringFieldUpdateOperationsInput | string
    startDateTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endDateTime?: DateTimeFieldUpdateOperationsInput | Date | string
    agenda?: NullableStringFieldUpdateOperationsInput | string | null
    notulensiRapat?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MeetingParticipantCreateInput = {
    meeting: MeetingCreateNestedOneWithoutParticipantsInput
    user: UserCreateNestedOneWithoutMeetingsInput
  }

  export type MeetingParticipantUncheckedCreateInput = {
    meetingId: string
    userId: string
  }

  export type MeetingParticipantUpdateInput = {
    meeting?: MeetingUpdateOneRequiredWithoutParticipantsNestedInput
    user?: UserUpdateOneRequiredWithoutMeetingsNestedInput
  }

  export type MeetingParticipantUncheckedUpdateInput = {
    meetingId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type MeetingParticipantCreateManyInput = {
    meetingId: string
    userId: string
  }

  export type MeetingParticipantUpdateManyMutationInput = {

  }

  export type MeetingParticipantUncheckedUpdateManyInput = {
    meetingId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type MeetingDocumentCreateInput = {
    id?: string
    namaFile: string
    pathFile: string
    tipeFile: string
    uploadedAt?: Date | string
    meeting: MeetingCreateNestedOneWithoutDocumentsInput
  }

  export type MeetingDocumentUncheckedCreateInput = {
    id?: string
    meetingId: string
    namaFile: string
    pathFile: string
    tipeFile: string
    uploadedAt?: Date | string
  }

  export type MeetingDocumentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    namaFile?: StringFieldUpdateOperationsInput | string
    pathFile?: StringFieldUpdateOperationsInput | string
    tipeFile?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    meeting?: MeetingUpdateOneRequiredWithoutDocumentsNestedInput
  }

  export type MeetingDocumentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    meetingId?: StringFieldUpdateOperationsInput | string
    namaFile?: StringFieldUpdateOperationsInput | string
    pathFile?: StringFieldUpdateOperationsInput | string
    tipeFile?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MeetingDocumentCreateManyInput = {
    id?: string
    meetingId: string
    namaFile: string
    pathFile: string
    tipeFile: string
    uploadedAt?: Date | string
  }

  export type MeetingDocumentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    namaFile?: StringFieldUpdateOperationsInput | string
    pathFile?: StringFieldUpdateOperationsInput | string
    tipeFile?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MeetingDocumentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    meetingId?: StringFieldUpdateOperationsInput | string
    namaFile?: StringFieldUpdateOperationsInput | string
    pathFile?: StringFieldUpdateOperationsInput | string
    tipeFile?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type MeetingParticipantListRelationFilter = {
    every?: MeetingParticipantWhereInput
    some?: MeetingParticipantWhereInput
    none?: MeetingParticipantWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type MeetingParticipantOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    nama?: SortOrder
    role?: SortOrder
    tandaTangan?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    nama?: SortOrder
    role?: SortOrder
    tandaTangan?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    nama?: SortOrder
    role?: SortOrder
    tandaTangan?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusFilter<$PrismaModel> | $Enums.Status
  }

  export type MeetingDocumentListRelationFilter = {
    every?: MeetingDocumentWhereInput
    some?: MeetingDocumentWhereInput
    none?: MeetingDocumentWhereInput
  }

  export type MeetingDocumentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MeetingCountOrderByAggregateInput = {
    id?: SortOrder
    namaRapat?: SortOrder
    startDateTime?: SortOrder
    endDateTime?: SortOrder
    agenda?: SortOrder
    notulensiRapat?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MeetingMaxOrderByAggregateInput = {
    id?: SortOrder
    namaRapat?: SortOrder
    startDateTime?: SortOrder
    endDateTime?: SortOrder
    agenda?: SortOrder
    notulensiRapat?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MeetingMinOrderByAggregateInput = {
    id?: SortOrder
    namaRapat?: SortOrder
    startDateTime?: SortOrder
    endDateTime?: SortOrder
    agenda?: SortOrder
    notulensiRapat?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusWithAggregatesFilter<$PrismaModel> | $Enums.Status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusFilter<$PrismaModel>
    _max?: NestedEnumStatusFilter<$PrismaModel>
  }

  export type MeetingScalarRelationFilter = {
    is?: MeetingWhereInput
    isNot?: MeetingWhereInput
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type MeetingParticipantMeetingIdUserIdCompoundUniqueInput = {
    meetingId: string
    userId: string
  }

  export type MeetingParticipantCountOrderByAggregateInput = {
    meetingId?: SortOrder
    userId?: SortOrder
  }

  export type MeetingParticipantMaxOrderByAggregateInput = {
    meetingId?: SortOrder
    userId?: SortOrder
  }

  export type MeetingParticipantMinOrderByAggregateInput = {
    meetingId?: SortOrder
    userId?: SortOrder
  }

  export type MeetingDocumentCountOrderByAggregateInput = {
    id?: SortOrder
    meetingId?: SortOrder
    namaFile?: SortOrder
    pathFile?: SortOrder
    tipeFile?: SortOrder
    uploadedAt?: SortOrder
  }

  export type MeetingDocumentMaxOrderByAggregateInput = {
    id?: SortOrder
    meetingId?: SortOrder
    namaFile?: SortOrder
    pathFile?: SortOrder
    tipeFile?: SortOrder
    uploadedAt?: SortOrder
  }

  export type MeetingDocumentMinOrderByAggregateInput = {
    id?: SortOrder
    meetingId?: SortOrder
    namaFile?: SortOrder
    pathFile?: SortOrder
    tipeFile?: SortOrder
    uploadedAt?: SortOrder
  }

  export type MeetingParticipantCreateNestedManyWithoutUserInput = {
    create?: XOR<MeetingParticipantCreateWithoutUserInput, MeetingParticipantUncheckedCreateWithoutUserInput> | MeetingParticipantCreateWithoutUserInput[] | MeetingParticipantUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MeetingParticipantCreateOrConnectWithoutUserInput | MeetingParticipantCreateOrConnectWithoutUserInput[]
    createMany?: MeetingParticipantCreateManyUserInputEnvelope
    connect?: MeetingParticipantWhereUniqueInput | MeetingParticipantWhereUniqueInput[]
  }

  export type MeetingParticipantUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<MeetingParticipantCreateWithoutUserInput, MeetingParticipantUncheckedCreateWithoutUserInput> | MeetingParticipantCreateWithoutUserInput[] | MeetingParticipantUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MeetingParticipantCreateOrConnectWithoutUserInput | MeetingParticipantCreateOrConnectWithoutUserInput[]
    createMany?: MeetingParticipantCreateManyUserInputEnvelope
    connect?: MeetingParticipantWhereUniqueInput | MeetingParticipantWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type MeetingParticipantUpdateManyWithoutUserNestedInput = {
    create?: XOR<MeetingParticipantCreateWithoutUserInput, MeetingParticipantUncheckedCreateWithoutUserInput> | MeetingParticipantCreateWithoutUserInput[] | MeetingParticipantUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MeetingParticipantCreateOrConnectWithoutUserInput | MeetingParticipantCreateOrConnectWithoutUserInput[]
    upsert?: MeetingParticipantUpsertWithWhereUniqueWithoutUserInput | MeetingParticipantUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MeetingParticipantCreateManyUserInputEnvelope
    set?: MeetingParticipantWhereUniqueInput | MeetingParticipantWhereUniqueInput[]
    disconnect?: MeetingParticipantWhereUniqueInput | MeetingParticipantWhereUniqueInput[]
    delete?: MeetingParticipantWhereUniqueInput | MeetingParticipantWhereUniqueInput[]
    connect?: MeetingParticipantWhereUniqueInput | MeetingParticipantWhereUniqueInput[]
    update?: MeetingParticipantUpdateWithWhereUniqueWithoutUserInput | MeetingParticipantUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MeetingParticipantUpdateManyWithWhereWithoutUserInput | MeetingParticipantUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MeetingParticipantScalarWhereInput | MeetingParticipantScalarWhereInput[]
  }

  export type MeetingParticipantUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<MeetingParticipantCreateWithoutUserInput, MeetingParticipantUncheckedCreateWithoutUserInput> | MeetingParticipantCreateWithoutUserInput[] | MeetingParticipantUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MeetingParticipantCreateOrConnectWithoutUserInput | MeetingParticipantCreateOrConnectWithoutUserInput[]
    upsert?: MeetingParticipantUpsertWithWhereUniqueWithoutUserInput | MeetingParticipantUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MeetingParticipantCreateManyUserInputEnvelope
    set?: MeetingParticipantWhereUniqueInput | MeetingParticipantWhereUniqueInput[]
    disconnect?: MeetingParticipantWhereUniqueInput | MeetingParticipantWhereUniqueInput[]
    delete?: MeetingParticipantWhereUniqueInput | MeetingParticipantWhereUniqueInput[]
    connect?: MeetingParticipantWhereUniqueInput | MeetingParticipantWhereUniqueInput[]
    update?: MeetingParticipantUpdateWithWhereUniqueWithoutUserInput | MeetingParticipantUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MeetingParticipantUpdateManyWithWhereWithoutUserInput | MeetingParticipantUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MeetingParticipantScalarWhereInput | MeetingParticipantScalarWhereInput[]
  }

  export type MeetingParticipantCreateNestedManyWithoutMeetingInput = {
    create?: XOR<MeetingParticipantCreateWithoutMeetingInput, MeetingParticipantUncheckedCreateWithoutMeetingInput> | MeetingParticipantCreateWithoutMeetingInput[] | MeetingParticipantUncheckedCreateWithoutMeetingInput[]
    connectOrCreate?: MeetingParticipantCreateOrConnectWithoutMeetingInput | MeetingParticipantCreateOrConnectWithoutMeetingInput[]
    createMany?: MeetingParticipantCreateManyMeetingInputEnvelope
    connect?: MeetingParticipantWhereUniqueInput | MeetingParticipantWhereUniqueInput[]
  }

  export type MeetingDocumentCreateNestedManyWithoutMeetingInput = {
    create?: XOR<MeetingDocumentCreateWithoutMeetingInput, MeetingDocumentUncheckedCreateWithoutMeetingInput> | MeetingDocumentCreateWithoutMeetingInput[] | MeetingDocumentUncheckedCreateWithoutMeetingInput[]
    connectOrCreate?: MeetingDocumentCreateOrConnectWithoutMeetingInput | MeetingDocumentCreateOrConnectWithoutMeetingInput[]
    createMany?: MeetingDocumentCreateManyMeetingInputEnvelope
    connect?: MeetingDocumentWhereUniqueInput | MeetingDocumentWhereUniqueInput[]
  }

  export type MeetingParticipantUncheckedCreateNestedManyWithoutMeetingInput = {
    create?: XOR<MeetingParticipantCreateWithoutMeetingInput, MeetingParticipantUncheckedCreateWithoutMeetingInput> | MeetingParticipantCreateWithoutMeetingInput[] | MeetingParticipantUncheckedCreateWithoutMeetingInput[]
    connectOrCreate?: MeetingParticipantCreateOrConnectWithoutMeetingInput | MeetingParticipantCreateOrConnectWithoutMeetingInput[]
    createMany?: MeetingParticipantCreateManyMeetingInputEnvelope
    connect?: MeetingParticipantWhereUniqueInput | MeetingParticipantWhereUniqueInput[]
  }

  export type MeetingDocumentUncheckedCreateNestedManyWithoutMeetingInput = {
    create?: XOR<MeetingDocumentCreateWithoutMeetingInput, MeetingDocumentUncheckedCreateWithoutMeetingInput> | MeetingDocumentCreateWithoutMeetingInput[] | MeetingDocumentUncheckedCreateWithoutMeetingInput[]
    connectOrCreate?: MeetingDocumentCreateOrConnectWithoutMeetingInput | MeetingDocumentCreateOrConnectWithoutMeetingInput[]
    createMany?: MeetingDocumentCreateManyMeetingInputEnvelope
    connect?: MeetingDocumentWhereUniqueInput | MeetingDocumentWhereUniqueInput[]
  }

  export type EnumStatusFieldUpdateOperationsInput = {
    set?: $Enums.Status
  }

  export type MeetingParticipantUpdateManyWithoutMeetingNestedInput = {
    create?: XOR<MeetingParticipantCreateWithoutMeetingInput, MeetingParticipantUncheckedCreateWithoutMeetingInput> | MeetingParticipantCreateWithoutMeetingInput[] | MeetingParticipantUncheckedCreateWithoutMeetingInput[]
    connectOrCreate?: MeetingParticipantCreateOrConnectWithoutMeetingInput | MeetingParticipantCreateOrConnectWithoutMeetingInput[]
    upsert?: MeetingParticipantUpsertWithWhereUniqueWithoutMeetingInput | MeetingParticipantUpsertWithWhereUniqueWithoutMeetingInput[]
    createMany?: MeetingParticipantCreateManyMeetingInputEnvelope
    set?: MeetingParticipantWhereUniqueInput | MeetingParticipantWhereUniqueInput[]
    disconnect?: MeetingParticipantWhereUniqueInput | MeetingParticipantWhereUniqueInput[]
    delete?: MeetingParticipantWhereUniqueInput | MeetingParticipantWhereUniqueInput[]
    connect?: MeetingParticipantWhereUniqueInput | MeetingParticipantWhereUniqueInput[]
    update?: MeetingParticipantUpdateWithWhereUniqueWithoutMeetingInput | MeetingParticipantUpdateWithWhereUniqueWithoutMeetingInput[]
    updateMany?: MeetingParticipantUpdateManyWithWhereWithoutMeetingInput | MeetingParticipantUpdateManyWithWhereWithoutMeetingInput[]
    deleteMany?: MeetingParticipantScalarWhereInput | MeetingParticipantScalarWhereInput[]
  }

  export type MeetingDocumentUpdateManyWithoutMeetingNestedInput = {
    create?: XOR<MeetingDocumentCreateWithoutMeetingInput, MeetingDocumentUncheckedCreateWithoutMeetingInput> | MeetingDocumentCreateWithoutMeetingInput[] | MeetingDocumentUncheckedCreateWithoutMeetingInput[]
    connectOrCreate?: MeetingDocumentCreateOrConnectWithoutMeetingInput | MeetingDocumentCreateOrConnectWithoutMeetingInput[]
    upsert?: MeetingDocumentUpsertWithWhereUniqueWithoutMeetingInput | MeetingDocumentUpsertWithWhereUniqueWithoutMeetingInput[]
    createMany?: MeetingDocumentCreateManyMeetingInputEnvelope
    set?: MeetingDocumentWhereUniqueInput | MeetingDocumentWhereUniqueInput[]
    disconnect?: MeetingDocumentWhereUniqueInput | MeetingDocumentWhereUniqueInput[]
    delete?: MeetingDocumentWhereUniqueInput | MeetingDocumentWhereUniqueInput[]
    connect?: MeetingDocumentWhereUniqueInput | MeetingDocumentWhereUniqueInput[]
    update?: MeetingDocumentUpdateWithWhereUniqueWithoutMeetingInput | MeetingDocumentUpdateWithWhereUniqueWithoutMeetingInput[]
    updateMany?: MeetingDocumentUpdateManyWithWhereWithoutMeetingInput | MeetingDocumentUpdateManyWithWhereWithoutMeetingInput[]
    deleteMany?: MeetingDocumentScalarWhereInput | MeetingDocumentScalarWhereInput[]
  }

  export type MeetingParticipantUncheckedUpdateManyWithoutMeetingNestedInput = {
    create?: XOR<MeetingParticipantCreateWithoutMeetingInput, MeetingParticipantUncheckedCreateWithoutMeetingInput> | MeetingParticipantCreateWithoutMeetingInput[] | MeetingParticipantUncheckedCreateWithoutMeetingInput[]
    connectOrCreate?: MeetingParticipantCreateOrConnectWithoutMeetingInput | MeetingParticipantCreateOrConnectWithoutMeetingInput[]
    upsert?: MeetingParticipantUpsertWithWhereUniqueWithoutMeetingInput | MeetingParticipantUpsertWithWhereUniqueWithoutMeetingInput[]
    createMany?: MeetingParticipantCreateManyMeetingInputEnvelope
    set?: MeetingParticipantWhereUniqueInput | MeetingParticipantWhereUniqueInput[]
    disconnect?: MeetingParticipantWhereUniqueInput | MeetingParticipantWhereUniqueInput[]
    delete?: MeetingParticipantWhereUniqueInput | MeetingParticipantWhereUniqueInput[]
    connect?: MeetingParticipantWhereUniqueInput | MeetingParticipantWhereUniqueInput[]
    update?: MeetingParticipantUpdateWithWhereUniqueWithoutMeetingInput | MeetingParticipantUpdateWithWhereUniqueWithoutMeetingInput[]
    updateMany?: MeetingParticipantUpdateManyWithWhereWithoutMeetingInput | MeetingParticipantUpdateManyWithWhereWithoutMeetingInput[]
    deleteMany?: MeetingParticipantScalarWhereInput | MeetingParticipantScalarWhereInput[]
  }

  export type MeetingDocumentUncheckedUpdateManyWithoutMeetingNestedInput = {
    create?: XOR<MeetingDocumentCreateWithoutMeetingInput, MeetingDocumentUncheckedCreateWithoutMeetingInput> | MeetingDocumentCreateWithoutMeetingInput[] | MeetingDocumentUncheckedCreateWithoutMeetingInput[]
    connectOrCreate?: MeetingDocumentCreateOrConnectWithoutMeetingInput | MeetingDocumentCreateOrConnectWithoutMeetingInput[]
    upsert?: MeetingDocumentUpsertWithWhereUniqueWithoutMeetingInput | MeetingDocumentUpsertWithWhereUniqueWithoutMeetingInput[]
    createMany?: MeetingDocumentCreateManyMeetingInputEnvelope
    set?: MeetingDocumentWhereUniqueInput | MeetingDocumentWhereUniqueInput[]
    disconnect?: MeetingDocumentWhereUniqueInput | MeetingDocumentWhereUniqueInput[]
    delete?: MeetingDocumentWhereUniqueInput | MeetingDocumentWhereUniqueInput[]
    connect?: MeetingDocumentWhereUniqueInput | MeetingDocumentWhereUniqueInput[]
    update?: MeetingDocumentUpdateWithWhereUniqueWithoutMeetingInput | MeetingDocumentUpdateWithWhereUniqueWithoutMeetingInput[]
    updateMany?: MeetingDocumentUpdateManyWithWhereWithoutMeetingInput | MeetingDocumentUpdateManyWithWhereWithoutMeetingInput[]
    deleteMany?: MeetingDocumentScalarWhereInput | MeetingDocumentScalarWhereInput[]
  }

  export type MeetingCreateNestedOneWithoutParticipantsInput = {
    create?: XOR<MeetingCreateWithoutParticipantsInput, MeetingUncheckedCreateWithoutParticipantsInput>
    connectOrCreate?: MeetingCreateOrConnectWithoutParticipantsInput
    connect?: MeetingWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutMeetingsInput = {
    create?: XOR<UserCreateWithoutMeetingsInput, UserUncheckedCreateWithoutMeetingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMeetingsInput
    connect?: UserWhereUniqueInput
  }

  export type MeetingUpdateOneRequiredWithoutParticipantsNestedInput = {
    create?: XOR<MeetingCreateWithoutParticipantsInput, MeetingUncheckedCreateWithoutParticipantsInput>
    connectOrCreate?: MeetingCreateOrConnectWithoutParticipantsInput
    upsert?: MeetingUpsertWithoutParticipantsInput
    connect?: MeetingWhereUniqueInput
    update?: XOR<XOR<MeetingUpdateToOneWithWhereWithoutParticipantsInput, MeetingUpdateWithoutParticipantsInput>, MeetingUncheckedUpdateWithoutParticipantsInput>
  }

  export type UserUpdateOneRequiredWithoutMeetingsNestedInput = {
    create?: XOR<UserCreateWithoutMeetingsInput, UserUncheckedCreateWithoutMeetingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMeetingsInput
    upsert?: UserUpsertWithoutMeetingsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMeetingsInput, UserUpdateWithoutMeetingsInput>, UserUncheckedUpdateWithoutMeetingsInput>
  }

  export type MeetingCreateNestedOneWithoutDocumentsInput = {
    create?: XOR<MeetingCreateWithoutDocumentsInput, MeetingUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: MeetingCreateOrConnectWithoutDocumentsInput
    connect?: MeetingWhereUniqueInput
  }

  export type MeetingUpdateOneRequiredWithoutDocumentsNestedInput = {
    create?: XOR<MeetingCreateWithoutDocumentsInput, MeetingUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: MeetingCreateOrConnectWithoutDocumentsInput
    upsert?: MeetingUpsertWithoutDocumentsInput
    connect?: MeetingWhereUniqueInput
    update?: XOR<XOR<MeetingUpdateToOneWithWhereWithoutDocumentsInput, MeetingUpdateWithoutDocumentsInput>, MeetingUncheckedUpdateWithoutDocumentsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusFilter<$PrismaModel> | $Enums.Status
  }

  export type NestedEnumStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusWithAggregatesFilter<$PrismaModel> | $Enums.Status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusFilter<$PrismaModel>
    _max?: NestedEnumStatusFilter<$PrismaModel>
  }

  export type MeetingParticipantCreateWithoutUserInput = {
    meeting: MeetingCreateNestedOneWithoutParticipantsInput
  }

  export type MeetingParticipantUncheckedCreateWithoutUserInput = {
    meetingId: string
  }

  export type MeetingParticipantCreateOrConnectWithoutUserInput = {
    where: MeetingParticipantWhereUniqueInput
    create: XOR<MeetingParticipantCreateWithoutUserInput, MeetingParticipantUncheckedCreateWithoutUserInput>
  }

  export type MeetingParticipantCreateManyUserInputEnvelope = {
    data: MeetingParticipantCreateManyUserInput | MeetingParticipantCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type MeetingParticipantUpsertWithWhereUniqueWithoutUserInput = {
    where: MeetingParticipantWhereUniqueInput
    update: XOR<MeetingParticipantUpdateWithoutUserInput, MeetingParticipantUncheckedUpdateWithoutUserInput>
    create: XOR<MeetingParticipantCreateWithoutUserInput, MeetingParticipantUncheckedCreateWithoutUserInput>
  }

  export type MeetingParticipantUpdateWithWhereUniqueWithoutUserInput = {
    where: MeetingParticipantWhereUniqueInput
    data: XOR<MeetingParticipantUpdateWithoutUserInput, MeetingParticipantUncheckedUpdateWithoutUserInput>
  }

  export type MeetingParticipantUpdateManyWithWhereWithoutUserInput = {
    where: MeetingParticipantScalarWhereInput
    data: XOR<MeetingParticipantUpdateManyMutationInput, MeetingParticipantUncheckedUpdateManyWithoutUserInput>
  }

  export type MeetingParticipantScalarWhereInput = {
    AND?: MeetingParticipantScalarWhereInput | MeetingParticipantScalarWhereInput[]
    OR?: MeetingParticipantScalarWhereInput[]
    NOT?: MeetingParticipantScalarWhereInput | MeetingParticipantScalarWhereInput[]
    meetingId?: StringFilter<"MeetingParticipant"> | string
    userId?: StringFilter<"MeetingParticipant"> | string
  }

  export type MeetingParticipantCreateWithoutMeetingInput = {
    user: UserCreateNestedOneWithoutMeetingsInput
  }

  export type MeetingParticipantUncheckedCreateWithoutMeetingInput = {
    userId: string
  }

  export type MeetingParticipantCreateOrConnectWithoutMeetingInput = {
    where: MeetingParticipantWhereUniqueInput
    create: XOR<MeetingParticipantCreateWithoutMeetingInput, MeetingParticipantUncheckedCreateWithoutMeetingInput>
  }

  export type MeetingParticipantCreateManyMeetingInputEnvelope = {
    data: MeetingParticipantCreateManyMeetingInput | MeetingParticipantCreateManyMeetingInput[]
    skipDuplicates?: boolean
  }

  export type MeetingDocumentCreateWithoutMeetingInput = {
    id?: string
    namaFile: string
    pathFile: string
    tipeFile: string
    uploadedAt?: Date | string
  }

  export type MeetingDocumentUncheckedCreateWithoutMeetingInput = {
    id?: string
    namaFile: string
    pathFile: string
    tipeFile: string
    uploadedAt?: Date | string
  }

  export type MeetingDocumentCreateOrConnectWithoutMeetingInput = {
    where: MeetingDocumentWhereUniqueInput
    create: XOR<MeetingDocumentCreateWithoutMeetingInput, MeetingDocumentUncheckedCreateWithoutMeetingInput>
  }

  export type MeetingDocumentCreateManyMeetingInputEnvelope = {
    data: MeetingDocumentCreateManyMeetingInput | MeetingDocumentCreateManyMeetingInput[]
    skipDuplicates?: boolean
  }

  export type MeetingParticipantUpsertWithWhereUniqueWithoutMeetingInput = {
    where: MeetingParticipantWhereUniqueInput
    update: XOR<MeetingParticipantUpdateWithoutMeetingInput, MeetingParticipantUncheckedUpdateWithoutMeetingInput>
    create: XOR<MeetingParticipantCreateWithoutMeetingInput, MeetingParticipantUncheckedCreateWithoutMeetingInput>
  }

  export type MeetingParticipantUpdateWithWhereUniqueWithoutMeetingInput = {
    where: MeetingParticipantWhereUniqueInput
    data: XOR<MeetingParticipantUpdateWithoutMeetingInput, MeetingParticipantUncheckedUpdateWithoutMeetingInput>
  }

  export type MeetingParticipantUpdateManyWithWhereWithoutMeetingInput = {
    where: MeetingParticipantScalarWhereInput
    data: XOR<MeetingParticipantUpdateManyMutationInput, MeetingParticipantUncheckedUpdateManyWithoutMeetingInput>
  }

  export type MeetingDocumentUpsertWithWhereUniqueWithoutMeetingInput = {
    where: MeetingDocumentWhereUniqueInput
    update: XOR<MeetingDocumentUpdateWithoutMeetingInput, MeetingDocumentUncheckedUpdateWithoutMeetingInput>
    create: XOR<MeetingDocumentCreateWithoutMeetingInput, MeetingDocumentUncheckedCreateWithoutMeetingInput>
  }

  export type MeetingDocumentUpdateWithWhereUniqueWithoutMeetingInput = {
    where: MeetingDocumentWhereUniqueInput
    data: XOR<MeetingDocumentUpdateWithoutMeetingInput, MeetingDocumentUncheckedUpdateWithoutMeetingInput>
  }

  export type MeetingDocumentUpdateManyWithWhereWithoutMeetingInput = {
    where: MeetingDocumentScalarWhereInput
    data: XOR<MeetingDocumentUpdateManyMutationInput, MeetingDocumentUncheckedUpdateManyWithoutMeetingInput>
  }

  export type MeetingDocumentScalarWhereInput = {
    AND?: MeetingDocumentScalarWhereInput | MeetingDocumentScalarWhereInput[]
    OR?: MeetingDocumentScalarWhereInput[]
    NOT?: MeetingDocumentScalarWhereInput | MeetingDocumentScalarWhereInput[]
    id?: StringFilter<"MeetingDocument"> | string
    meetingId?: StringFilter<"MeetingDocument"> | string
    namaFile?: StringFilter<"MeetingDocument"> | string
    pathFile?: StringFilter<"MeetingDocument"> | string
    tipeFile?: StringFilter<"MeetingDocument"> | string
    uploadedAt?: DateTimeFilter<"MeetingDocument"> | Date | string
  }

  export type MeetingCreateWithoutParticipantsInput = {
    id?: string
    namaRapat: string
    startDateTime: Date | string
    endDateTime: Date | string
    agenda?: string | null
    notulensiRapat?: string | null
    status?: $Enums.Status
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: MeetingDocumentCreateNestedManyWithoutMeetingInput
  }

  export type MeetingUncheckedCreateWithoutParticipantsInput = {
    id?: string
    namaRapat: string
    startDateTime: Date | string
    endDateTime: Date | string
    agenda?: string | null
    notulensiRapat?: string | null
    status?: $Enums.Status
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: MeetingDocumentUncheckedCreateNestedManyWithoutMeetingInput
  }

  export type MeetingCreateOrConnectWithoutParticipantsInput = {
    where: MeetingWhereUniqueInput
    create: XOR<MeetingCreateWithoutParticipantsInput, MeetingUncheckedCreateWithoutParticipantsInput>
  }

  export type UserCreateWithoutMeetingsInput = {
    id?: string
    email: string
    password: string
    nama: string
    role?: $Enums.Role
    tandaTangan?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateWithoutMeetingsInput = {
    id?: string
    email: string
    password: string
    nama: string
    role?: $Enums.Role
    tandaTangan?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCreateOrConnectWithoutMeetingsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMeetingsInput, UserUncheckedCreateWithoutMeetingsInput>
  }

  export type MeetingUpsertWithoutParticipantsInput = {
    update: XOR<MeetingUpdateWithoutParticipantsInput, MeetingUncheckedUpdateWithoutParticipantsInput>
    create: XOR<MeetingCreateWithoutParticipantsInput, MeetingUncheckedCreateWithoutParticipantsInput>
    where?: MeetingWhereInput
  }

  export type MeetingUpdateToOneWithWhereWithoutParticipantsInput = {
    where?: MeetingWhereInput
    data: XOR<MeetingUpdateWithoutParticipantsInput, MeetingUncheckedUpdateWithoutParticipantsInput>
  }

  export type MeetingUpdateWithoutParticipantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    namaRapat?: StringFieldUpdateOperationsInput | string
    startDateTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endDateTime?: DateTimeFieldUpdateOperationsInput | Date | string
    agenda?: NullableStringFieldUpdateOperationsInput | string | null
    notulensiRapat?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: MeetingDocumentUpdateManyWithoutMeetingNestedInput
  }

  export type MeetingUncheckedUpdateWithoutParticipantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    namaRapat?: StringFieldUpdateOperationsInput | string
    startDateTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endDateTime?: DateTimeFieldUpdateOperationsInput | Date | string
    agenda?: NullableStringFieldUpdateOperationsInput | string | null
    notulensiRapat?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: MeetingDocumentUncheckedUpdateManyWithoutMeetingNestedInput
  }

  export type UserUpsertWithoutMeetingsInput = {
    update: XOR<UserUpdateWithoutMeetingsInput, UserUncheckedUpdateWithoutMeetingsInput>
    create: XOR<UserCreateWithoutMeetingsInput, UserUncheckedCreateWithoutMeetingsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMeetingsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMeetingsInput, UserUncheckedUpdateWithoutMeetingsInput>
  }

  export type UserUpdateWithoutMeetingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    tandaTangan?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutMeetingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    tandaTangan?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MeetingCreateWithoutDocumentsInput = {
    id?: string
    namaRapat: string
    startDateTime: Date | string
    endDateTime: Date | string
    agenda?: string | null
    notulensiRapat?: string | null
    status?: $Enums.Status
    createdAt?: Date | string
    updatedAt?: Date | string
    participants?: MeetingParticipantCreateNestedManyWithoutMeetingInput
  }

  export type MeetingUncheckedCreateWithoutDocumentsInput = {
    id?: string
    namaRapat: string
    startDateTime: Date | string
    endDateTime: Date | string
    agenda?: string | null
    notulensiRapat?: string | null
    status?: $Enums.Status
    createdAt?: Date | string
    updatedAt?: Date | string
    participants?: MeetingParticipantUncheckedCreateNestedManyWithoutMeetingInput
  }

  export type MeetingCreateOrConnectWithoutDocumentsInput = {
    where: MeetingWhereUniqueInput
    create: XOR<MeetingCreateWithoutDocumentsInput, MeetingUncheckedCreateWithoutDocumentsInput>
  }

  export type MeetingUpsertWithoutDocumentsInput = {
    update: XOR<MeetingUpdateWithoutDocumentsInput, MeetingUncheckedUpdateWithoutDocumentsInput>
    create: XOR<MeetingCreateWithoutDocumentsInput, MeetingUncheckedCreateWithoutDocumentsInput>
    where?: MeetingWhereInput
  }

  export type MeetingUpdateToOneWithWhereWithoutDocumentsInput = {
    where?: MeetingWhereInput
    data: XOR<MeetingUpdateWithoutDocumentsInput, MeetingUncheckedUpdateWithoutDocumentsInput>
  }

  export type MeetingUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    namaRapat?: StringFieldUpdateOperationsInput | string
    startDateTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endDateTime?: DateTimeFieldUpdateOperationsInput | Date | string
    agenda?: NullableStringFieldUpdateOperationsInput | string | null
    notulensiRapat?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    participants?: MeetingParticipantUpdateManyWithoutMeetingNestedInput
  }

  export type MeetingUncheckedUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    namaRapat?: StringFieldUpdateOperationsInput | string
    startDateTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endDateTime?: DateTimeFieldUpdateOperationsInput | Date | string
    agenda?: NullableStringFieldUpdateOperationsInput | string | null
    notulensiRapat?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    participants?: MeetingParticipantUncheckedUpdateManyWithoutMeetingNestedInput
  }

  export type MeetingParticipantCreateManyUserInput = {
    meetingId: string
  }

  export type MeetingParticipantUpdateWithoutUserInput = {
    meeting?: MeetingUpdateOneRequiredWithoutParticipantsNestedInput
  }

  export type MeetingParticipantUncheckedUpdateWithoutUserInput = {
    meetingId?: StringFieldUpdateOperationsInput | string
  }

  export type MeetingParticipantUncheckedUpdateManyWithoutUserInput = {
    meetingId?: StringFieldUpdateOperationsInput | string
  }

  export type MeetingParticipantCreateManyMeetingInput = {
    userId: string
  }

  export type MeetingDocumentCreateManyMeetingInput = {
    id?: string
    namaFile: string
    pathFile: string
    tipeFile: string
    uploadedAt?: Date | string
  }

  export type MeetingParticipantUpdateWithoutMeetingInput = {
    user?: UserUpdateOneRequiredWithoutMeetingsNestedInput
  }

  export type MeetingParticipantUncheckedUpdateWithoutMeetingInput = {
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type MeetingParticipantUncheckedUpdateManyWithoutMeetingInput = {
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type MeetingDocumentUpdateWithoutMeetingInput = {
    id?: StringFieldUpdateOperationsInput | string
    namaFile?: StringFieldUpdateOperationsInput | string
    pathFile?: StringFieldUpdateOperationsInput | string
    tipeFile?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MeetingDocumentUncheckedUpdateWithoutMeetingInput = {
    id?: StringFieldUpdateOperationsInput | string
    namaFile?: StringFieldUpdateOperationsInput | string
    pathFile?: StringFieldUpdateOperationsInput | string
    tipeFile?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MeetingDocumentUncheckedUpdateManyWithoutMeetingInput = {
    id?: StringFieldUpdateOperationsInput | string
    namaFile?: StringFieldUpdateOperationsInput | string
    pathFile?: StringFieldUpdateOperationsInput | string
    tipeFile?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}