'use client'

import { ErrorLayout } from '@/widgets/layout'
import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <ErrorLayout
          iconSrc='./icons/server-error.svg'
          code='Sorry'
          text='an unknown error occurred'
        />
      )
    }

    return this.props.children
  }
}

export { ErrorBoundary }
