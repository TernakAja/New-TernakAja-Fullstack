"use client"

import React from 'react'
import { ErrorCard } from '@/components/ui/error-card'

interface ErrorBoundaryProps {
    children: React.ReactNode
    fallback?: React.ReactNode
}

interface ErrorBoundaryState {
    hasError: boolean
    error: Error | null
}

/**
 * DataErrorBoundary — App-owned client Error Boundary for Suspense fences.
 *
 * Wraps any data-fetching component tree to prevent silent white-screens
 * when server queries fail (network errors, Supabase RLS rejections, etc.).
 *
 * Usage:
 *   <DataErrorBoundary>
 *     <Suspense fallback={<Skeleton />}>
 *       <MyServerComponent />
 *     </Suspense>
 *   </DataErrorBoundary>
 */
export class DataErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = { hasError: false, error: null }
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error }
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        // In production you'd send this to Sentry/Datadog
        console.error('[DataErrorBoundary]', error, info.componentStack)
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback ?? (
                <ErrorCard
                    title="Failed to load data"
                    message={this.state.error?.message ?? "An unexpected error occurred. Please refresh."}
                />
            )
        }
        return this.props.children
    }
}
