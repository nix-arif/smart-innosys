
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  username: 'username',
  email: 'email',
  hashedPassword: 'hashedPassword',
  addressLine1: 'addressLine1',
  addressLine2: 'addressLine2',
  addressLine3: 'addressLine3',
  city: 'city',
  postcode: 'postcode',
  province: 'province',
  country: 'country',
  department: 'department',
  epfNo: 'epfNo',
  fullname: 'fullname',
  icNo: 'icNo',
  phoneNo: 'phoneNo',
  role: 'role',
  socsoNo: 'socsoNo'
};

exports.Prisma.SessionScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  expiresAt: 'expiresAt'
};

exports.Prisma.SupplierScalarFieldEnum = {
  id: 'id',
  supplierName: 'supplierName',
  companyName: 'companyName',
  phone: 'phone',
  email: 'email',
  addressLine1: 'addressLine1',
  addressLine2: 'addressLine2',
  addressLine3: 'addressLine3',
  postcode: 'postcode',
  city: 'city',
  province: 'province',
  country: 'country'
};

exports.Prisma.ProductScalarFieldEnum = {
  id: 'id',
  sku: 'sku',
  productCode: 'productCode',
  description: 'description',
  unitPrice: 'unitPrice',
  oum: 'oum',
  supplierId: 'supplierId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  mdaProductId: 'mdaProductId'
};

exports.Prisma.StoreScalarFieldEnum = {
  id: 'id',
  storeName: 'storeName',
  addressLine1: 'addressLine1',
  addressLine2: 'addressLine2',
  addressLine3: 'addressLine3',
  postcode: 'postcode',
  city: 'city',
  province: 'province',
  country: 'country',
  userId: 'userId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.StockScalarFieldEnum = {
  id: 'id',
  lotNo: 'lotNo',
  manufactureDate: 'manufactureDate',
  expiredDate: 'expiredDate',
  qty: 'qty',
  productId: 'productId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.StoreStockScalarFieldEnum = {
  id: 'id',
  storeId: 'storeId',
  stockId: 'stockId'
};

exports.Prisma.CustomerScalarFieldEnum = {
  id: 'id',
  title: 'title',
  fullname: 'fullname',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CustomerOrganizationScalarFieldEnum = {
  id: 'id',
  department: 'department',
  organizationName: 'organizationName',
  organizationSSMNo: 'organizationSSMNo',
  organizationTINNo: 'organizationTINNo',
  addressLine1: 'addressLine1',
  addressLine2: 'addressLine2',
  addressLine3: 'addressLine3',
  city: 'city',
  province: 'province',
  country: 'country',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  postcode: 'postcode'
};

exports.Prisma.QuotationScalarFieldEnum = {
  id: 'id',
  agent: 'agent',
  quoteType: 'quoteType',
  quoteId: 'quoteId',
  date: 'date',
  customerId: 'customerId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  title: 'title'
};

exports.Prisma.QuotationItemScalarFieldEnum = {
  id: 'id',
  sku: 'sku',
  quotationId: 'quotationId',
  productCode: 'productCode',
  description: 'description',
  unitPrice: 'unitPrice',
  oum: 'oum',
  qty: 'qty',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.MDAProductScalarFieldEnum = {
  id: 'id',
  registrationNo: 'registrationNo',
  effectiveDate: 'effectiveDate',
  expiryDate: 'expiryDate',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.Department = exports.$Enums.Department = {
  UNASSIGN: 'UNASSIGN',
  MANAGEMENT: 'MANAGEMENT',
  SALES: 'SALES',
  MARKETING: 'MARKETING',
  LOGISTIC: 'LOGISTIC'
};

exports.Role = exports.$Enums.Role = {
  SUPERADMIN: 'SUPERADMIN',
  DIRECTOR: 'DIRECTOR',
  MANAGER: 'MANAGER',
  ADMIN: 'ADMIN',
  STAFF: 'STAFF'
};

exports.QuoteType = exports.$Enums.QuoteType = {
  ORIGINAL: 'ORIGINAL',
  DUMMY: 'DUMMY'
};

exports.Prisma.ModelName = {
  User: 'User',
  Session: 'Session',
  Supplier: 'Supplier',
  Product: 'Product',
  Store: 'Store',
  Stock: 'Stock',
  StoreStock: 'StoreStock',
  Customer: 'Customer',
  CustomerOrganization: 'CustomerOrganization',
  Quotation: 'Quotation',
  QuotationItem: 'QuotationItem',
  MDAProduct: 'MDAProduct'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
