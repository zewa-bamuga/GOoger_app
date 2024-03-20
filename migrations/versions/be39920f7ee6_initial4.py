"""Initial4

Revision ID: be39920f7ee6
Revises: 3ea41fb54392
Create Date: 2023-12-23 12:23:21.845562

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'be39920f7ee6'
down_revision: Union[str, None] = '3ea41fb54392'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
