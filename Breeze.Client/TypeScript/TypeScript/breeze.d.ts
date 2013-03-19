// Type definitions for Breeze 1.0
// Project: http://www.breezejs.com/
// Definitions by: Boris Yankov <https://github.com/borisyankov/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

// Updated Jan 14 2011 - Jay Traband ( www.ideablade.com).


declare module breezeCore {

    interface ErrorCallback {
        (error: Error): void;
    }

    interface IEnum {
        contains(object: any): bool;
        fromName(name: string): EnumSymbol;
        getNames(): string[];
        getSymbols(): EnumSymbol[];
    }

    class Enum implements IEnum {
        constructor (name: string, methodObj?: any);

        addSymbol(propertiesObj?: any): EnumSymbol;
        contains(object: any): bool;
        fromName(name: string): EnumSymbol;
        getNames(): string[];
        getSymbols(): EnumSymbol[];
        static isSymbol(object: any): bool;
        seal(): void;
    }

    class EnumSymbol {
        parentEnum: IEnum;

        getName(): string;
        toString(): string;
    }

    class Event {
        constructor (name: string, publisher: any, defaultErrorCallback?: ErrorCallback);

        static enable(eventName: string, target: any): void;
        static enable(eventName: string, target: any, isEnabled: bool): void;
        static enable(eventName: string, target: any, isEnabled: Function): void;

        static isEnabled(eventName: string, target: any): bool;
        publish(data: any, publishAsync?: bool, errorCallback?: ErrorCallback): void;
        publishAsync(data: any, errorCallback?: ErrorCallback): void;
        subscribe(callback?: (data: any) => void ): number;
        unsubscribe(unsubKey: number): bool;
    }
}

declare module breeze {

    interface Entity {
        entityAspect: EntityAspect;
        entityType: EntityType;
    }

    interface ComplexObject {
        complexAspect: ComplexAspect;
        complexType: ComplexType;
    }

    interface IProperty {
        name: string;
        parentEntityType: EntityType;
        validators: Validator[];
        isDataProperty: bool;
        isNavigationProperty: bool;
    }

    interface IStructuralType {
        complexProperties: DataProperty[];
        dataProperties: DataProperty[];
        name: string;
        namespace: string;
        shortName: string;
        unmappedProperties: DataProperty[];
        validators: Validator[];
    }

    class AutoGeneratedKeyType {
        static Identity: AutoGeneratedKeyType;
        static KeyGenerator: AutoGeneratedKeyType;
        static None: AutoGeneratedKeyType;
    }

    class ComplexAspect {
        complexObject: ComplexObject;
        entityAspect: EntityAspect;
        parent: Object;
        parentProperty: DataProperty;
        propertyPath: string;
        originalValues: Object;
    }

    class ComplexType implements IStructuralType {
        complexProperties: DataProperty[];
        dataProperties: DataProperty[];
        name: string;
        namespace: string;
        shortName: string;
        unmappedProperties: DataProperty[];
        validators: Validator[];
        addProperty(dataProperty: DataProperty);
        getProperties(): DataProperty[];
    }

    class DataProperty implements IProperty {
        complexTypeName: string;
        concurrencyMode: string;
        dataType: DataTypeSymbol;
        defaultValue: any;
        fixedLength: bool;
        isComplexProperty: bool;
        isDataProperty: bool;
        isNavigationProperty: bool;
        isNullable: bool;
        isPartOfKey: bool;
        isUnmapped: bool;
        
        maxLength: number;
        name: string;
        nameOnServer: string;
        parentEntityType: EntityType;
        relatedNavigationProperty: NavigationProperty;
        validators: Validator[];
        constructor (config: DataPropertyOptions);
    }

    interface DataPropertyOptions {
        complexTypeName?: string;
        concurrencyMode?: string;
        dataType?: DataTypeSymbol;
        defaultValue?: any;
        fixedLength?: bool;
        isNullable?: bool;
        isPartOfKey?: bool;
        isUnmapped?: bool;
        maxLength?: number;
        name?: string;
        nameOnServer?: string;
        validators?: Validator[];
    }

    class DataService {
        adapterName: string;
        hasServerMetadata: bool;
        serviceName: string;
        jsonResultsAdapter: JsonResultsAdapter;
        constructor(config: DataServiceOptions);
    }

    interface DataServiceOptions {
        adapterName?: string;
        hasServerMetadata?: bool;
        serviceName?: string;
        jsonResultsAdapter?: JsonResultsAdapter;
    }

    class JsonResultsAdapter {
        name: string;
        extractResults: (data: {}) => {};
        visitNode: (node: {}, queryContext: QueryContext, nodeContext: NodeContext) => { entityType?: EntityType; nodeId?: any; nodeRefId?: any; ignore?: bool; };
        constructor(config: {
            name: string;
            extractResults?: (data: {}) => {};
            visitNode: (node: {}, queryContext: QueryContext, nodeContext: NodeContext) => { entityType?: EntityType; nodeId?: any; nodeRefId?: any; ignore?: bool; };
        });
    }

    interface QueryContext {
        query: any; // how to also say it could be an EntityQuery or a string
        entityManager: EntityManager;
        jsonResultsAdapter: JsonResultsAdapter; 
        mergeStrategy: MergeStrategy;
    }

    interface NodeContext {
        nodeType: string;
    }



    class DataTypeSymbol extends breezeCore.EnumSymbol {
         defaultValue: any;
         isNumeric: bool;
    }
    interface DataType extends breezeCore.IEnum {
        Binary: DataTypeSymbol;
        Boolean: DataTypeSymbol;
        Byte: DataTypeSymbol;
        DateTime: DataTypeSymbol;
        Decimal: DataTypeSymbol;
        Double: DataTypeSymbol;
        Guid: DataTypeSymbol;
        Int16: DataTypeSymbol;
        Int32: DataTypeSymbol;
        Int64: DataTypeSymbol;
        Single: DataTypeSymbol;
        String: DataTypeSymbol;
        Time: DataTypeSymbol;
        Undefined: DataTypeSymbol;
        toDataType(typeName: string): DataTypeSymbol;
        parseDateFromServer(date: any): Date;

    }
    declare var DataType: DataType; 

    class EntityActionSymbol extends breezeCore.EnumSymbol {
    }
    interface EntityAction extends breezeCore.IEnum {
        AcceptChanges: EntityActionSymbol;
        Attach: EntityActionSymbol;
        AttachOnImport: EntityActionSymbol;
        AttachOnQuery: EntityActionSymbol;
        Clear: EntityActionSymbol;
        Detach: EntityActionSymbol;
        EntityStateChange: EntityActionSymbol;
        MergeOnImport: EntityActionSymbol;
        MergeOnSave: EntityActionSymbol;
        MergeOnQuery: EntityActionSymbol;
        PropertyChange: EntityActionSymbol;
        RejectChanges: EntityActionSymbol;
    }
    var EntityAction: EntityAction;

    class EntityAspect {
        entity: Entity;
        entityManager: EntityManager;
        entityState: EntityStateSymbol;
        isBeingSaved: bool;
        originalValues: any;

        propertyChanged: PropertyChangedEvent;
        validationErrorsChanged: ValidationErrorsChangedEvent;

        acceptChanges(): void;
        addValidationError(validationError: ValidationError): void;
        clearValidationErrors(): void;
        getKey(forceRefresh?: bool): EntityKey;

        getValidationErrors(): ValidationError[];
        getValidationErrors(property: string): ValidationError[];
        getValidationErrors(property: IProperty): ValidationError[];

        loadNavigationProperty(navigationProperty: string, callback?: Function, errorCallback?: Function): Promise;
        loadNavigationProperty(navigationProperty: NavigationProperty, callback?: Function, errorCallback?: Function): Promise;

        rejectChanges(): void;

        removeValidationError(validator: Validator): void;
        removeValidationError(validator: Validator, property: DataProperty): void;
        removeValidationError(validator: Validator, property: NavigationProperty): void;

        setDeleted(): void;
        setModified(): void;
        setUnchanged(): void;
        validateEntity(): bool;

        validateProperty(property: string, context?: any): bool;
        validateProperty(property: DataProperty, context?: any): bool;
        validateProperty(property: NavigationProperty, context?: any): bool;
    }

    class PropertyChangedEventArgs {
        entity: Entity;
        propertyName: string;
        oldValue: any;
        newValue: any;
    }

    class PropertyChangedEvent extends breezeCore.Event {
        subscribe(callback?: (data: PropertyChangedEventArgs) => void ): number;
    }

    class ValidationErrorsChangedEventArgs {
        entity: Entity;
        added: ValidationError[]; 
        removed: ValidationError[]; 
    }

    class ValidationErrorsChangedEvent extends breezeCore.Event {
        subscribe(callback?: (data: ValidationErrorsChangedEventArgs) => void ): number;
    }

    class EntityKey {
        constructor (entityType: EntityType, keyValue: any);
        constructor (entityType: EntityType, keyValues: any[]);

        equals(entityKey: EntityKey): bool;
        static equals(k1: EntityKey, k2: EntityKey): bool;
    }

    class EntityManager {
        dataService: DataService;
        keyGeneratorCtor: Function;
        metadataStore: MetadataStore;
        queryOptions: QueryOptions;
        saveOptions: SaveOptions;
        serviceName: string;
        validationOptions: ValidationOptions;

        entityChanged: EntityChangedEvent;
        hasChangesChanged: HasChangesChangedEvent;

        constructor (config?: EntityManagerOptions);
        constructor (config?: string);

        addEntity(entity: Entity): Entity;
        attachEntity(entity: Entity, entityState?: EntityStateSymbol): Entity;
        clear(): void;
        createEmptyCopy(): EntityManager;
        createEntity(typeName: string, config?: {}, entityState?: EntityStateSymbol) : Entity;
        detachEntity(entity: Entity): bool;
        executeQuery(query: string, callback?: ExecuteQuerySuccessCallback, errorCallback?: ExecuteQueryErrorCallback): Promise;
        executeQuery(query: EntityQuery, callback?: ExecuteQuerySuccessCallback, errorCallback?: ExecuteQueryErrorCallback): Promise;

        executeQueryLocally(query: EntityQuery): Entity[];
        exportEntities(entities?: Entity[]): string;
        fetchEntityByKey(typeName: string, keyValue: any, checkLocalCacheFirst?: bool): Promise;
        fetchEntityByKey(typeName: string, keyValues: any[], checkLocalCacheFirst?: bool): Promise;
        fetchEntityByKey(entityKey: EntityKey): Promise;
        fetchMetadata(callback?: (schema: any) => void , errorCallback?: breezeCore.ErrorCallback): Promise;
        generateTempKeyValue(entity: Entity): any;
        getChanges(): Entity[];
        getChanges(entityTypeName: string): Entity[];
        getChanges(entityTypeNames: string[]): Entity[];
        getChanges(entityType: EntityType): Entity[];
        getChanges(entityTypes: EntityType[]): Entity[];

        getEntities(entityTypeName: string, entityState?: EntityStateSymbol): Entity[];
        getEntities(entityTypeNames?: string[], entityState?: EntityStateSymbol): Entity[];
        getEntities(entityTypeName?: string, entityStates?: EntityStateSymbol[]): Entity[];
        getEntities(entityTypeNames?: string[], entityStates?: EntityStateSymbol[]): Entity[];

        getEntities(entityType: EntityType, entityState?: EntityStateSymbol): Entity[];
        getEntities(entityTypes?: EntityType[], entityState?: EntityStateSymbol): Entity[];
        getEntities(entityType?: EntityType, entityStates?: EntityStateSymbol[]): Entity[];
        getEntities(entityTypes?: EntityType[], entityStates?: EntityStateSymbol[]): Entity[];

        getEntityByKey(typeName: string, keyValue: any): Entity;
        getEntityByKey(typeName: string, keyValues: any[]): Entity;
        getEntityByKey(entityKey: EntityKey): Entity;

        hasChanges(): bool;
        hasChanges(entityTypeName: string): bool;
        hasChanges(entityTypeNames: string[]): bool;
        hasChanges(entityType: EntityType): bool;
        hasChanges(entityTypes: EntityType[]): bool;

        static importEntities(exportedString: string, config?: { mergeStrategy?: MergeStrategySymbol; }): EntityManager;
        importEntities(exportedString: string, config?: { mergeStrategy?: MergeStrategySymbol; }): EntityManager;

        rejectChanges(): Entity[];
        saveChanges(entities?: Entity[], saveOptions?: SaveOptions, callback?: SaveChangesSuccessCallback, errorCallback?: SaveChangesErrorCallback): Promise;
        setProperties(config: EntityManagerProperties): void;
    }

    interface EntityManagerOptions {
        serviceName?: string;
        dataService?: DataService;
        metadataStore?: MetadataStore;
        queryOptions?: QueryOptions;
        saveOptions?: SaveOptions;
        validationOptions?: ValidationOptions;
        keyGeneratorCtor?: Function;
    }

    interface EntityManagerProperties {
        serviceName?: string;
        dataService?: DataService;
        queryOptions?: QueryOptions;
        saveOptions?: SaveOptions;
        validationOptions?: ValidationOptions;
        keyGeneratorCtor?: Function;
    }

    interface ExecuteQuerySuccessCallback {
        (data: { results: Entity[]; query: EntityQuery; XHR: XMLHttpRequest; }): void;
    }

    interface ExecuteQueryErrorCallback {
        (error: { query: EntityQuery; XHR: XMLHttpRequest; }): void;
    }

    interface SaveChangesSuccessCallback {
        (saveResult: { entities: Entity[]; keyMappings: any; XHR: XMLHttpRequest; }): void;
    }

    interface SaveChangesErrorCallback {
        (error: { XHR: XMLHttpRequest; }): void;
    }

    class EntityChangedEventArgs {
        entity: Entity;
        entityAction: EntityActionSymbol;
        args: Object;
    }

    class EntityChangedEvent extends breezeCore.Event {
        subscribe(callback?: (data: EntityChangedEventArgs) => void ): number;
    }

    class HasChangesChangedEventArgs {
        entityManager: EntityManager;
        hasChanges: bool;
    }

    class HasChangesChangedEvent extends breezeCore.Event {
        subscribe(callback?: (data: HasChangesChangedEventArgs) => void ): number;
    }

    class EntityQuery {
        entityManager: EntityManager;
        orderByClause: OrderByClause;
        parameters: Object;
        queryOptions: QueryOptions;
        resourceName: string;
        skipCount: number;
        takeCount: number;
        wherePredicate: Predicate;

        constructor (resourceName?: string);

        execute(callback?: ExecuteQuerySuccessCallback, errorCallback?: ExecuteQueryErrorCallback): Promise;
        executeLocally(): Entity[];
        expand(propertyPaths: string[]): EntityQuery;
        expand(propertyPaths: string): EntityQuery;
        static from(resourceName: string): EntityQuery;
        from(resourceName: string): EntityQuery;
        static fromEntities(entity: Entity): EntityQuery;
        static fromEntities(entities: Entity[]): EntityQuery;
        static fromEntityKey(entityKey: EntityKey): EntityQuery;
        static fromEntityNavigation(entity: Entity, navigationProperty: NavigationProperty): EntityQuery;
        inlineCount(enabled?: bool): EntityQuery;
        orderBy(propertyPaths: string): EntityQuery;
        orderBy(propertyPaths: string[]): EntityQuery;
        orderByDesc(propertyPaths: string): EntityQuery;
        orderByDesc(propertyPaths: string[]): EntityQuery;
        select(propertyPaths: string): EntityQuery;
        select(propertyPaths: string[]): EntityQuery;
        skip(count: number): EntityQuery;
        take(count: number): EntityQuery;
        top(count: number): EntityQuery;
        toType(typeName: string): EntityQuery;
        toType(type: EntityType): EntityQuery;

        using(obj: EntityManager): EntityQuery;
        using(obj: MergeStrategySymbol): EntityQuery;
        using(obj: FetchStrategySymbol): EntityQuery;
        using(obj: JsonResultsAdapter): EntityQuery;

        where(predicate: Predicate): EntityQuery;
        where(property: string, operator: string, value: any): EntityQuery;
        where(property: string, operator: FilterQueryOpSymbol, value: any): EntityQuery;
        where(predicate: FilterQueryOpSymbol): EntityQuery;
        withParameters(params: Object): EntityQuery;
    }

    interface OrderByClause {
    }

    class EntityStateSymbol extends breezeCore.EnumSymbol {
        isAdded(): bool;
        isAddedModifiedOrDeleted(): bool;
        isDeleted(): bool;
        isDetached(): bool;
        isModified(): bool;
        isUnchanged(): bool;
        isUnchangedOrModified(): bool;
    }
    interface EntityState extends breezeCore.IEnum {
        Added: EntityStateSymbol;
        Deleted: EntityStateSymbol;
        Detached: EntityStateSymbol;
        Modified: EntityStateSymbol;
        Unchanged: EntityStateSymbol;
    }
    var EntityState: EntityState;

    class EntityType implements IStructuralType {
        autoGeneratedKeyType: AutoGeneratedKeyType;
        complexProperties: DataProperty[];
        concurrencyProperties: DataProperty[];
        dataProperties: DataProperty[];
        defaultResourceName: string;
        foreignKeyProperties: DataProperty[];
        keyProperties: DataProperty[];
        metadataStore: MetadataStore;
        name: string;
        namespace: string;
        navigationProperties: NavigationProperty[];
        shortName: string;
        unmappedProperties: DataProperty[];
        validators: Validator[];

        constructor (config: MetadataStore);
        constructor (config: EntityTypeOptions);

        addProperty(property: IProperty): void;
        addValidator(validator: Validator, property?: IProperty): void;
        createEntity(initialValues?: Object): Entity;
        getDataProperty(propertyName: string): DataProperty;
        getEntityCtor(): Function;
        getNavigationProperty(propertyName: string): NavigationProperty;
        getProperties(): IProperty[];
        getProperty(propertyPath: string, throwIfNotFound?: bool): IProperty;
        getPropertyNames(): string[];
        setProperties(config: EntityTypeProperties): void;
        toString(): string;
    }

    interface EntityTypeOptions {
        shortName?: string;
        namespace?: string;
        autogeneratedKeyType?: AutoGeneratedKeyType;
        defaultResourceName?: string;
    }

    interface EntityTypeProperties {
        autogeneratedKeyType?: AutoGeneratedKeyType;
        defaultResourceName?: string;
    }

    class FetchStrategySymbol extends breezeCore.EnumSymbol {
    }
    interface FetchStrategy extends breezeCore.IEnum {
        FromLocalCache: FetchStrategySymbol;
        FromServer: FetchStrategySymbol;
    }
    var FetchStrategy: FetchStrategy;

    class FilterQueryOpSymbol extends breezeCore.EnumSymbol {
    }
    interface FilterQueryOp extends breezeCore.IEnum {
        Contains: FilterQueryOpSymbol;
        EndsWith: FilterQueryOpSymbol;
        Equals: FilterQueryOpSymbol;
        GreaterThan: FilterQueryOpSymbol;
        GreaterThanOrEqual: FilterQueryOpSymbol;
        LessThan: FilterQueryOpSymbol;
        LessThanOrEqual: FilterQueryOpSymbol;
        NotEquals: FilterQueryOpSymbol;
        StartsWith: FilterQueryOpSymbol;
    }
    var FilterQueryOp: FilterQueryOp;

    class LocalQueryComparisonOptions {
        static caseInsensitiveSQL: LocalQueryComparisonOptions;
        static defaultInstance: LocalQueryComparisonOptions;

        constructor (config: { name?: string; isCaseSensitive?: bool; usesSql92CompliantStringComparison?: bool; });

        setAsDefault(): void;
    }

    class MergeStrategySymbol extends breezeCore.EnumSymbol {
    }
    interface MergeStrategy extends breezeCore.IEnum {
        OverwriteChanges: MergeStrategySymbol;
        PreserveChanges: MergeStrategySymbol;
    }
    var MergeStrategy: MergeStrategy;

    class MetadataStore {
        namingConvention: NamingConvention;

        constructor (config?: MetadataStoreOptions);
        addDataService(dataService: DataService): void;
        addEntityType(structuralType: IStructuralType): void;
        exportMetadata(): string;
        fetchMetadata(dataService: string, callback?: (data) => void , errorCallback?: breezeCore.ErrorCallback): Promise;
        fetchMetadata(dataService: DataService, callback?: (data) => void , errorCallback?: breezeCore.ErrorCallback): Promise;
        getDataService(serviceName: string): DataService;
        getEntityType(entityTypeName: string, okIfNotFound?: bool): IStructuralType;
        getEntityTypes(): IStructuralType[];
        hasMetadataFor(serviceName: string): bool;
        static importMetadata(exportedString: string): MetadataStore;
        importMetadata(exportedString: string): MetadataStore;
        isEmpty(): bool;
        registerEntityTypeCtor(entityTypeName: string, entityCtor: Function, initializationFn?: (entity: Entity) =>void ): void;
        trackUnmappedType(entityCtor: Function, interceptor?: Function);
    }

    interface MetadataStoreOptions {
        namingConvention?: NamingConvention;
        localQueryComparisonOptions?: LocalQueryComparisonOptions;
    }

    class NamingConvention {
        static camelCase: NamingConvention;
        static defaultInstance: NamingConvention;
        static none: NamingConvention;

        constructor (config: NamingConventionOptions);

        clientPropertyNameToServer(clientPropertyName: string): string;
        clientPropertyNameToServer(clientPropertyName: string, property: IProperty): string;

        serverPropertyNameToClient(serverPropertyName: string): string;
        serverPropertyNameToClient(serverPropertyName: string, property: IProperty): string;

        setAsDefault();
    }

    interface NamingConventionOptions {
        serverPropertyNameToClient?: (name: string) => string;
        clientPropertyNameToServer?: (name: string) => string;
    }

    class NavigationProperty implements IProperty {
        associationName: string;
        entityType: EntityType;
        foreignKeyNames: string[];
        inverse: NavigationProperty;
        isDataProperty: bool;
        isNavigationProperty: bool;
        isScalar: bool;
        name: string;
        parentEntityType: EntityType;
        relatedDataProperties: DataProperty[];
        validators: Validator[];

        constructor (config: NavigationPropertyOptions);
    }

    interface NavigationPropertyOptions {
        name?: string;
        nameOnServer?: string;
        entityTypeName: string;
        isScalar?: bool;
        associationName?: string;
        foreignKeyNames?: string[];
        foreignKeyNamesOnServer?: string[];
        validators?: Validator[];
    }

    class Predicate {
        constructor (property: string, operator: string, value: any, valueIsLiteral?: bool);
        constructor (property: string, operator: FilterQueryOpSymbol, value: any, valueIsLiteral?: bool);

        and: PredicateMethod;
        static and: PredicateMethod;

        static create: PredicateMethod;

        static isPredicate(o: any): bool;

        static not(predicate: Predicate): Predicate;
        not(): Predicate;

        static or: PredicateMethod;
        or: PredicateMethod;

        toFunction(): Function;
        toString(): string;
        validate(entityType: EntityType): void;
    }

    interface PredicateMethod {
        (predicates: Predicate[]): Predicate;
        (...predicates: Predicate[]): Predicate;
        (property: string, operator: string, value: any, valueIsLiteral?: bool): Predicate;
        (property: string, operator: FilterQueryOpSymbol, value: any, valueIsLiteral?: bool): Predicate;
    }

    class Promise {
        fail(errorCallback: Function): Promise;
        fin(finallyCallback: Function): Promise;
        then(callback: Function): Promise;
    }

    class QueryOptions {
        static defaultInstance: QueryOptions;
        fetchStrategy: FetchStrategySymbol;
        mergeStrategy: MergeStrategySymbol;

        constructor (config?: QueryOptionsConfiguration);

        setAsDefault(): void;
        using(config: QueryOptionsConfiguration): QueryOptions;
        using(config: MergeStrategySymbol): QueryOptions;
        using(config: FetchStrategySymbol): QueryOptions; 
    }

    interface QueryOptionsConfiguration {
        fetchStrategy?: FetchStrategySymbol;
        mergeStrategy?: MergeStrategySymbol;
    }

    class SaveOptions {
        allowConcurrentSaves: bool;
        static defaultInstance: SaveOptions;

        constructor (config?: { allowConcurrentSaves?: bool; });

        setAsDefault(): SaveOptions;
    }

    class ValidationError {
        context: any;
        errorMessage: string;
        property: IProperty;
        propertyName: string;
        validator: Validator;

        constructor (validator: Validator, context: any, errorMessage: string);
    }

    class ValidationOptions {
        static defaultInstance: ValidationOptions;
        validateOnAttach: bool;
        validateOnPropertyChange: bool;
        validateOnQuery: bool;
        validateOnSave: bool;

        constructor (config?: ValidationOptionsConfiguration);

        setAsDefault(): ValidationOptions;
        using(config: ValidationOptionsConfiguration): ValidationOptions;
    }

    interface ValidationOptionsConfiguration {
        validateOnAttach?: bool;
        validateOnSave?: bool;
        validateOnQuery?: bool;
        validateOnPropertyChange?: bool;
    }

    class Validator {
        static messageTemplates: any;

        constructor (name: string, validatorFn: ValidatorFunction, context?: any);

        static bool(): Validator;
        static byte(): Validator;
        static date(): Validator;
        static duration(): Validator;
        getMessage(): string;
        static guid(): Validator;
        static int16(): Validator;
        static int32(): Validator;
        static int64(): Validator;
        static maxLength(context: { maxLength: number; }): Validator;
        static number(): Validator;
        static required(): Validator;
        static string(): Validator;
        static stringLength(context: { maxLength: number; minLength: number; }): Validator;
        validate(value: any, context?: any): ValidationError;
    }

    interface ValidatorFunction {
        (value: any, context: ValidatorFunctionContext): void;
    }

    interface ValidatorFunctionContext {
        value: any;
        validatorName: string;
        displayName: string;
        messageTemplate: string;
        message?: string;
    }
}