/// <reference types="@fib-orm/sql-query" />
/// <reference types="@fib-orm/sql-ddl-sync" />
/// <reference types="@fxjs/knex" />

/// <reference path="_common.d.ts" />
/// <reference path="property.d.ts" />
/// <reference path="Queries.d.ts" />

declare namespace FxOrmDML {
    type KnexQueryBuilder = FxOrmTypeHelpers.ReturnType<FKnexNS.KnexInstance['queryBuilder']>;

    type BeforeQueryItem = (
        builer: KnexQueryBuilder,
        ctx: { dml: DMLDialect, knex: FKnexNS.KnexInstance }
    ) => typeof builer | void

    class DMLDialect<CONN_TYPE = any> extends FxOrmDXL.DXLDialect<CONN_TYPE> {
        find: {
            <T = Fibjs.AnyObject[]>(
                collection: string,
                opts?: {
                    $dml?: FxOrmDML.DMLDialect,
                    where?: Fibjs.AnyObject,
                    joins?: FxOrmQueries.OperatorFunction[],
                    fields?: string[],
                    select?: { [k: string]: string },

                    offset?: FxOrmTypeHelpers.FirstParameter<FKnexNS.KnexInstance['offset']>
                    limit?: FxOrmTypeHelpers.FirstParameter<FKnexNS.KnexInstance['limit']>
                    orderBy?: FxOrmTypeHelpers.Parameters<FKnexNS.KnexInstance['orderBy']>

                    beforeQuery?: FxOrmTypeHelpers.ItOrListOfIt<BeforeQueryItem>
                    filterQueryResult?: <T2 = any>(result: any) => T2
                } & FxOrmDXL.OptionsCommon<CONN_TYPE>
            ): T
        }
        count: {
            <T = number>(
                collection: string,
                opts?: {
                    connection?: FxOrmTypeHelpers.SecondParameter<FxOrmDML.DMLDialect['find']>['connection'],
                    where?: FxOrmTypeHelpers.SecondParameter<FxOrmDML.DMLDialect['find']>['where'],
                    joins?: FxOrmTypeHelpers.SecondParameter<FxOrmDML.DMLDialect['find']>['joins'],
                    fields?: string[],
                    select?: { [k: string]: string },

                    countParams?: FxOrmTypeHelpers.Parameters<FKnexNS.KnexInstance['count']>
                    beforeQuery?: FxOrmTypeHelpers.ItOrListOfIt<BeforeQueryItem>
                    filterQueryResult?: <T2 = any>(result: any) => T2
                }
            ): number
        }
        exists: {
            <T = boolean>(
                collection: string,
                opts?: {
                    connection?: FxOrmTypeHelpers.SecondParameter<FxOrmDML.DMLDialect['find']>['connection'],
                    where?: Fibjs.AnyObject,
                    beforeQuery?: FxOrmTypeHelpers.ItOrListOfIt<BeforeQueryItem>
                    filterQueryResult?: <T2 = any>(result: any) => T2
                }
            ): boolean
        }
        insert: {
            (
                collection: string,
                data: FxSqlQuerySql.DataToSet,
                opts?: {
                    connection?: FxOrmTypeHelpers.SecondParameter<FxOrmDML.DMLDialect['find']>['connection'],
                    idPropertyList?: FxOrmProperty.Class_Property[],
                    beforeQuery?: FxOrmTypeHelpers.ItOrListOfIt<BeforeQueryItem>
                }
            ): Fibjs.AnyObject
        }
        update: {
            <T = any>(
                collection: string,
                changes: FxSqlQuerySql.DataToSet,
                opts?: {
                    connection?: FxOrmTypeHelpers.SecondParameter<FxOrmDML.DMLDialect['find']>['connection'],
                    where?: Fibjs.AnyObject,
                    // idPropertyList?: FxOrmProperty.Class_Property[],
                    beforeQuery?: FxOrmTypeHelpers.ItOrListOfIt<BeforeQueryItem>
                }
            ): T
        }
        remove: {
            <T = number>(
                collection: string,
                opts?: {
                    connection?: FxOrmTypeHelpers.SecondParameter<FxOrmDML.DMLDialect['find']>['connection'],
                    where: Fibjs.AnyObject,
                    beforeQuery?: FxOrmTypeHelpers.ItOrListOfIt<BeforeQueryItem>
                }
            ): T
        }
        clear: {
            <T = any>(
                collection: string,
                opts?: {
                    connection?: FxOrmTypeHelpers.SecondParameter<FxOrmDML.DMLDialect['find']>['connection'],
                }
            ): T
        }
    }
}
