import type { ApplicationStatus } from '@/entities/application'

export type ApplicationChangeStatusPayload = {
  applicationId: string
  status: ApplicationStatus
}
