"""Initial5

Revision ID: 41515f4ab72f
Revises: be39920f7ee6
Create Date: 2023-12-23 12:28:19.276652

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '41515f4ab72f'
down_revision: Union[str, None] = 'be39920f7ee6'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
