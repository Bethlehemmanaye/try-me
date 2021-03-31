import React from "react"

export const defaultPermissions = {
  create: true, read: true, update: true, delete: true,
  post: false, send_for_approval: true, approve: true,
  invoice: true, cash_payment: true
}

export const PermissionProvider = ({ permissionSets, Component, props }) => {
  return (
    <Component
      {...props}
      permissions={permissionSets? permissionSets : defaultPermissions}
    />
  )
}